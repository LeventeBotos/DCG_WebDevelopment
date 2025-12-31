"use client";
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

export type BackgroundRippleHandle = {
  triggerAt: (point: { x: number; y: number }) => void;
  hoverAt: (point: { x: number; y: number }) => void;
  clearHover: () => void;
};

type BackgroundRippleProps = {
  rows?: number;
  cols?: number;
  cellSize?: number;
  interactive?: boolean;
  className?: string;
};

export const BackgroundRippleEffect = forwardRef<
  BackgroundRippleHandle,
  BackgroundRippleProps
>(function BackgroundRippleEffect(
  {
    rows = 8,
    cols = 27,
    cellSize = 56,
    interactive = true,
    className,
  },
  ref
) {
  const [clickedCell, setClickedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [rippleKey, setRippleKey] = useState(0);
  const [hoveredCell, setHoveredCell] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const triggerRipple = useCallback((row: number, col: number) => {
    setClickedCell({ row, col });
    setRippleKey((k) => k + 1);
  }, []);

  const resolveCellFromPoint = useCallback(
    ({ x, y }: { x: number; y: number }) => {
      if (!interactive || !containerRef.current) return null;
      const rect = containerRef.current.getBoundingClientRect();
      const relX = x - rect.left;
      const relY = y - rect.top;
      const col = Math.floor(relX / cellSize);
      const row = Math.floor(relY / cellSize);
      if (row >= 0 && row < rows && col >= 0 && col < cols) {
        return { row, col };
      }
      return null;
    },
    [cellSize, cols, interactive, rows]
  );

  const triggerAtPoint = useCallback(
    ({ x, y }: { x: number; y: number }) => {
      const cell = resolveCellFromPoint({ x, y });
      if (cell) triggerRipple(cell.row, cell.col);
    },
    [resolveCellFromPoint, triggerRipple]
  );

  const hoverAtPoint = useCallback(
    ({ x, y }: { x: number; y: number }) => {
      const cell = resolveCellFromPoint({ x, y });
      setHoveredCell(cell);
    },
    [resolveCellFromPoint]
  );

  useImperativeHandle(
    ref,
    () => ({
      triggerAt: triggerAtPoint,
      hoverAt: hoverAtPoint,
      clearHover: () => setHoveredCell(null),
    }),
    [triggerAtPoint, hoverAtPoint]
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 z-0 h-full w-full",
        "[--cell-border-color:var(--color-neutral-300)] [--cell-fill-color:var(--color-neutral-100)] [--cell-shadow-color:var(--color-neutral-500)]",
        !interactive && "pointer-events-none",
        className
      )}
    >
      <div className="relative h-auto w-auto overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-[2] h-full w-full overflow-hidden" />
        <DivGrid
          key={`base-${rippleKey}`}
          className="mask-radial-from-20% mask-radial-at-top opacity-600"
          rows={rows}
          cols={cols}
          cellSize={cellSize}
          borderColor="var(--cell-border-color)"
          fillColor="var(--cell-fill-color)"
          clickedCell={clickedCell}
          hoveredCell={hoveredCell}
          onCellClick={
            interactive
              ? (row, col) => {
                  triggerRipple(row, col);
                }
              : undefined
          }
          onCellEnter={
            interactive
              ? (row, col) => {
                  setHoveredCell({ row, col });
                }
              : undefined
          }
          interactive={interactive}
        />
      </div>
    </div>
  );
});

type DivGridProps = {
  className?: string;
  rows: number;
  cols: number;
  cellSize: number; // in pixels
  borderColor: string;
  fillColor: string;
  clickedCell: { row: number; col: number } | null;
  hoveredCell?: { row: number; col: number } | null;
  onCellClick?: (row: number, col: number) => void;
  onCellEnter?: (row: number, col: number) => void;
  interactive?: boolean;
};

type CellStyle = React.CSSProperties & {
  ["--delay"]?: string;
  ["--duration"]?: string;
};

const DivGrid = ({
  className,
  rows = 7,
  cols = 30,
  cellSize = 56,
  borderColor = "#3f3f46",
  fillColor = "rgba(14,165,233,0.3)",
  clickedCell = null,
  hoveredCell = null,
  onCellClick = () => {},
  onCellEnter = () => {},
  interactive = true,
}: DivGridProps) => {
  const cells = useMemo(
    () => Array.from({ length: rows * cols }, (_, idx) => idx),
    [rows, cols]
  );

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
    gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
    width: cols * cellSize,
    height: rows * cellSize,
    marginInline: "auto",
  };

  return (
    <div className={cn("relative z-[3]", className)} style={gridStyle}>
      {cells.map((idx) => {
        const rowIdx = Math.floor(idx / cols);
        const colIdx = idx % cols;
        const distance = clickedCell
          ? Math.hypot(clickedCell.row - rowIdx, clickedCell.col - colIdx)
          : 0;
        const delay = clickedCell ? Math.max(0, distance * 55) : 0; // ms
        const duration = 200 + distance * 80; // ms
        const isHovered =
          hoveredCell &&
          hoveredCell.row === rowIdx &&
          hoveredCell.col === colIdx;

        const style: CellStyle = clickedCell
          ? {
              "--delay": `${delay}ms`,
              "--duration": `${duration}ms`,
            }
          : {};

        return (
          <div
            key={idx}
            className={cn(
              "cell relative border-[0.5px] opacity-40 transition-opacity duration-150 will-change-transform hover:opacity-80",
              clickedCell && "animate-cell-ripple [animation-fill-mode:none]",
              !interactive && "pointer-events-none"
            )}
            style={{
              backgroundColor: isHovered
                ? "var(--cell-hover-color, #f8f8f8)"
                : fillColor,
              borderColor: borderColor,
              ...style,
            }}
            onClick={
              interactive ? () => onCellClick?.(rowIdx, colIdx) : undefined
            }
            onMouseEnter={
              interactive ? () => onCellEnter?.(rowIdx, colIdx) : undefined
            }
          />
        );
      })}
    </div>
  );
};
