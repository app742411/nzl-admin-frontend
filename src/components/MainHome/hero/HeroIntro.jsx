// HeroIntro.jsx
export default function HeroIntro() {
  return (
    <div className="relative z-10 mx-auto max-w-3xl text-center pt-32">
      <img src="/images/logo/nzl-icon.svg" className="mx-auto mb-6 h-16" />

      <h1 className="text-4xl md:text-6xl font-extrabold text-dark">
        Your Choice, Your Price <br />
        <span className="text-brand-500">Shopping Reimagined</span>
      </h1>

      <p className="mt-6 text-dark/70">
        Every price drops in real time. Wait smart, act fast, or team up to
        unlock group deals.
      </p>

      <div className="mt-8 flex justify-center gap-4 mb-8">
        <img src="/images/image/AppStore.png" className="h-12" />
        <img src="/images/image/GooglePlay.png" className="h-12" />
      </div>
    </div>
  );
}
