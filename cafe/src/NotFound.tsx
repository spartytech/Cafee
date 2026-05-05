export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-stone-950 text-white">
      <p className="text-8xl mb-6">☕</p>
      <h1 className="text-4xl font-bold mb-3">Stránka nenalezena</h1>
      <p className="text-stone-400 mb-8">Tato stránka neexistuje — ale dobrá káva ano.</p>
      <a
        href="/"
        className="px-6 py-3 bg-amber-700 hover:bg-amber-600 rounded-full transition-colors"
      >
        Zpět na hlavní stránku
      </a>
    </div>
  );
}