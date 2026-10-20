import SettingsForm from "./settings-form";

export default function Home() {
  return (
    <main className="min-h-screen px-4 py-12 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-2xl">
        <header className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-indigo-600">
            Account
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Settings
          </h1>
          <p className="mt-3 max-w-xl leading-7 text-slate-600">
            Manage your profile and the updates you receive.
          </p>
        </header>
        <SettingsForm />
      </div>
    </main>
  );
}
