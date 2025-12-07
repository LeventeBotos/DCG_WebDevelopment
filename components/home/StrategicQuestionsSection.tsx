"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const questions = [
  "How do we reach and engage the right customers at the right moments?",
  "How do we convert, support and grow customers across every channel?",
  "How do we lay the path for an AI-first, future-built enterprise?",
];

export default function StrategicQuestionsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % questions.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative  ">
      {/* <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-blue-400/10"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
            }}
            animate={{
              x: [
                Math.random() * 100 + "%",
                Math.random() * 100 + "%",
                Math.random() * 100 + "%",
              ],
              y: [
                Math.random() * 100 + "%",
                Math.random() * 100 + "%",
                Math.random() * 100 + "%",
              ],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </div> */}

      <motion.div
        key={activeIndex}
        className="mx-auto mb-12 h-40 max-w-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative overflow-hidden rounded-xl bg-white text-black border-black/5 border  shadow-xl">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />

          <motion.div
            className="absolute right-0 bottom-0  top-0 text-center flex flex-col justify-center text-7xl md:text-9xl font-bold text-black text-opacity-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {activeIndex + 1}
          </motion.div>

          <div className="relative ">
            <motion.h2
              className="text-xl p-6 pr-10 md:p-12  font-semibold leading-tight text-black/70 md:text-4xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {questions[activeIndex].split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.4 + i * 0.03,
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.h2>
          </div>

          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-dcg-lightBlue to-dcg-lightGreen"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 4, ease: "linear" }}
            style={{ transformOrigin: "left" }}
          />
        </div>
      </motion.div>

      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3 md:flex hidden">
        {questions.map((question, index) => (
          <div
            key={index}
            className="rounded-xl bg-white p-6 shadow-md ring-1 ring-slate-200"
          >
            <p className="text-sm font-medium leading-relaxed text-slate-700">
              {question}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

// function QuestionThumbnail({
//   question,
//   index,
//   isActive,
//   onClick,
// }: {
//   question: string
//   index: number
//   isActive: boolean
//   onClick: () => void
// }) {
//   const ref = useRef(null)
//   const isInView = useInView(ref, { once: true })
//   const controls = useAnimation()

//   useEffect(() => {
//     if (isInView) {
//       controls.start("visible")
//     }
//   }, [isInView, controls])

//   return (
//     <motion.div
//       ref={ref}
//       className="group relative cursor-pointer"
//       initial="hidden"
//       animate={controls}
//       variants={{
//         hidden: { opacity: 0, y: 30 },
//         visible: {
//           opacity: 1,
//           y: 0,
//           transition: {
//             duration: 0.6,
//             ease: [0.22, 1, 0.36, 1],
//             delay: index * 0.1,
//           },
//         },
//       }}
//       whileHover={{
//         y: -8,
//         transition: { duration: 0.3, ease: "easeOut" },
//       }}
//       onClick={onClick}
//     >
//       <motion.div
//         className="relative overflow-hidden rounded-xl bg-white p-6 shadow-md ring-1 ring-slate-200 transition-all"
//         animate={{
//           ringColor: isActive ? "rgb(59 130 246 / 0.5)" : "rgb(226 232 240)",
//           ringWidth: isActive ? "2px" : "1px",
//         }}
//         transition={{ duration: 0.3 }}
//       >
//         {isActive && (
//           <motion.div
//             className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.3 }}
//           />
//         )}

//         <motion.div
//           className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-slate-700 to-slate-900 text-sm font-semibold text-white shadow-md"
//           animate={{
//             scale: isActive ? [1, 1.1, 1] : 1,
//           }}
//           transition={{
//             duration: 2,
//             repeat: isActive ? Number.POSITIVE_INFINITY : 0,
//             ease: "easeInOut",
//           }}
//         >
//           {index + 1}
//         </motion.div>

//         <p className="relative z-10 pr-4 text-sm font-medium leading-relaxed text-slate-700">{question}</p>

//         <motion.div
//           className="mt-4 h-0.5 rounded-full bg-slate-100"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.3 + index * 0.1 }}
//         >
//           <motion.div
//             className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"
//             initial={{ width: "0%" }}
//             animate={{ width: isActive ? "100%" : "25%" }}
//             transition={{ duration: 0.5, ease: "easeOut" }}
//           />
//         </motion.div>

//         <motion.div
//           className="absolute -bottom-2 -right-2 h-20 w-20 opacity-0 transition-opacity group-hover:opacity-100"
//           initial={false}
//         >
//           <div className="h-full w-full rounded-full bg-gradient-to-br from-blue-500/5 to-indigo-500/5 blur-xl" />
//         </motion.div>
//       </motion.div>
//     </motion.div>
//   )
// }
