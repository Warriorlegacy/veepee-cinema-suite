import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, type FormEvent } from "react";
import { Lock, Trash2, Upload, LogOut, Loader2 } from "lucide-react";
import {
  listServices,
  isAdminUnlocked,
  unlockAdmin,
  lockAdmin,
  createService,
  deleteService,
} from "@/lib/services.functions";
import { ICON_NAMES, getServiceIcon } from "@/lib/service-icons";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin · VEEPEE Engineers" },
      { name: "description", content: "Admin panel for VEEPEE Engineers." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const { data: gate, isLoading } = useQuery({
    queryKey: ["admin-gate"],
    queryFn: () => isAdminUnlocked(),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-magenta" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {gate?.unlocked ? <AdminDashboard /> : <UnlockGate />}
    </div>
  );
}

function UnlockGate() {
  const qc = useQueryClient();
  const unlock = useServerFn(unlockAdmin);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(false);
    try {
      const res = await unlock({ data: { password } });
      if (res.ok) {
        await qc.invalidateQueries({ queryKey: ["admin-gate"] });
      } else {
        setError(true);
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md glass rounded-lg p-8 border border-white/10"
      >
        <div className="flex items-center gap-3 mb-6">
          <Lock className="h-5 w-5 text-magenta" />
          <h1 className="font-display text-2xl tracking-wide">Admin Access</h1>
        </div>
        <label className="block text-xs uppercase tracking-[0.2em] text-metallic mb-2">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          className="w-full bg-black/40 border border-white/10 rounded-md px-4 py-3 text-white focus:border-magenta focus:outline-none"
        />
        {error && (
          <p className="mt-3 text-sm text-red-400">Incorrect password.</p>
        )}
        <button
          type="submit"
          disabled={busy || !password}
          className="mt-6 w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-magenta-gradient text-white font-sans-brand uppercase tracking-[0.2em] text-sm rounded-md hover:shadow-magenta transition-all disabled:opacity-50"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Unlock"}
        </button>
      </form>
    </div>
  );
}

function AdminDashboard() {
  const qc = useQueryClient();
  const { data: services = [] } = useQuery({
    queryKey: ["services"],
    queryFn: () => listServices(),
  });
  const lock = useServerFn(lockAdmin);
  const create = useServerFn(createService);
  const remove = useServerFn(deleteService);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState(ICON_NAMES[0]);
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const delMut = useMutation({
    mutationFn: (id: string) => remove({ data: { id } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["services"] });
    },
  });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    try {
      const fd = new FormData();
      fd.set("name", name);
      fd.set("description", description);
      fd.set("icon", icon);
      if (file) fd.set("image", file);
      await create({ data: fd });
      setName("");
      setDescription("");
      setFile(null);
      setMsg("Service added.");
      await qc.invalidateQueries({ queryKey: ["services"] });
    } catch (err) {
      setMsg((err as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function onLock() {
    await lock();
    await qc.invalidateQueries({ queryKey: ["admin-gate"] });
  }

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-16">
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="font-sans-brand text-[10px] tracking-[0.4em] text-magenta uppercase">
            VEEPEE · Admin
          </p>
          <h1 className="font-display text-4xl md:text-5xl mt-2">Services</h1>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/"
            className="font-sans-brand text-xs uppercase tracking-[0.2em] text-metallic hover:text-white"
          >
            View site
          </a>
          <button
            onClick={onLock}
            className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 rounded-md text-sm text-metallic hover:text-white hover:border-magenta transition-colors"
          >
            <LogOut className="h-4 w-4" /> Lock
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[380px,1fr] gap-10">
        {/* Add form */}
        <form
          onSubmit={onSubmit}
          className="glass rounded-lg p-6 border border-white/10 h-fit sticky top-24"
        >
          <h2 className="font-display text-2xl mb-5">Add a service</h2>

          <label className="block text-xs uppercase tracking-[0.2em] text-metallic mb-2">
            Name
          </label>
          <input
            required
            maxLength={120}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 text-white focus:border-magenta focus:outline-none mb-4"
          />

          <label className="block text-xs uppercase tracking-[0.2em] text-metallic mb-2">
            Description
          </label>
          <textarea
            required
            maxLength={400}
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 text-white focus:border-magenta focus:outline-none mb-4 resize-none"
          />

          <label className="block text-xs uppercase tracking-[0.2em] text-metallic mb-2">
            Icon
          </label>
          <select
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 text-white focus:border-magenta focus:outline-none mb-4"
          >
            {ICON_NAMES.map((n) => (
              <option key={n} value={n} className="bg-[#0A0A0A]">
                {n}
              </option>
            ))}
          </select>

          <label className="block text-xs uppercase tracking-[0.2em] text-metallic mb-2">
            Sample image
          </label>
          <label className="flex items-center gap-2 px-3 py-2 border border-dashed border-white/20 rounded-md cursor-pointer hover:border-magenta transition-colors mb-2">
            <Upload className="h-4 w-4 text-magenta" />
            <span className="text-sm text-metallic truncate">
              {file ? file.name : "Choose an image (JPG/PNG, ≤5 MB)"}
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="hidden"
            />
          </label>

          {msg && (
            <p className="text-sm text-metallic mb-3">{msg}</p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="mt-3 w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-magenta-gradient text-white font-sans-brand uppercase tracking-[0.2em] text-sm rounded-md hover:shadow-magenta transition-all disabled:opacity-50"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add Service"}
          </button>
        </form>

        {/* List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {services.map((s) => {
            const Icon = getServiceIcon(s.icon);
            return (
              <div
                key={s.id}
                className="glass rounded-lg border border-white/10 overflow-hidden group"
              >
                {s.image_url && (
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={s.image_url}
                      alt={s.name}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-magenta" />
                        <h3 className="font-display text-lg truncate">{s.name}</h3>
                      </div>
                      <p className="mt-1 text-sm text-metallic line-clamp-2">
                        {s.description}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        if (confirm(`Delete "${s.name}"?`)) delMut.mutate(s.id);
                      }}
                      className="shrink-0 p-2 rounded-md border border-white/10 text-metallic hover:text-red-400 hover:border-red-400/40 transition-colors"
                      aria-label="Delete service"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
