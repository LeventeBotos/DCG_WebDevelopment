/** Text-free artwork for the login screen: a slow teal/blue aurora over deep navy. Safari-safe: no blur filters, blend modes or % heights. */
export default function LoginArt() {
  return (
    <div
      aria-hidden
      className="absolute inset-4 isolate overflow-hidden rounded-[2rem] bg-[#031225] [transform:translateZ(0)] [-webkit-mask-image:-webkit-radial-gradient(white,black)]"
    >
      <style>{`
        @keyframes dcg-drift-a { 0%,100% { transform: translate3d(-8%,0,0) scale(1); } 50% { transform: translate3d(10%,6%,0) scale(1.15); } }
        @keyframes dcg-drift-b { 0%,100% { transform: translate3d(8%,0,0) scale(1.1); } 50% { transform: translate3d(-10%,8%,0) scale(0.95); } }
        @media (prefers-reduced-motion: reduce) { .dcg-blob { animation: none !important; } }
      `}</style>

      {/* light pooling at the top, fading to dark below */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_70%_at_50%_-5%,#bff7f3_0%,#2fd4d0_14%,#0a78b4_38%,#0a2a5c_62%,#031225_85%)]" />
      <div
        className="dcg-blob absolute -left-1/4 top-[2%] h-[70%] w-[100%]"
        style={{ background: "radial-gradient(closest-side, rgba(0,202,204,0.45), rgba(0,202,204,0))", animation: "dcg-drift-a 18s ease-in-out infinite" }}
      />
      <div
        className="dcg-blob absolute -right-1/4 top-[16%] h-[65%] w-[95%]"
        style={{ background: "radial-gradient(closest-side, rgba(43,95,217,0.5), rgba(43,95,217,0))", animation: "dcg-drift-b 22s ease-in-out infinite" }}
      />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#020a16] to-transparent" />
    </div>
  );
}
