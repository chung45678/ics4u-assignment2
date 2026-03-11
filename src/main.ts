import "./style.css"

(document.getElementById("solveCubic")as HTMLButtonElement).addEventListener("click", () => {
  const a = Number((document.getElementById("a-value") as HTMLInputElement).value);
  const b = Number((document.getElementById("b-value") as HTMLInputElement).value);
  const c = Number((document.getElementById("c-value") as HTMLInputElement).value);
  const d = Number((document.getElementById("d-value") as HTMLInputElement).value);
  
  const equationParts: string[] = [];

  if (a !== 0) equationParts.push(`${a === 1 ? "" : a}x³`);

  if (b !== 0) {
    if (b === 1) equationParts.push("+ x²");
    else if (b === -1) equationParts.push("- x²");
    else equationParts.push(`${b > 0 ? "+" : "-"} ${Math.abs(b)}x²`);
  }

  if (c !== 0) {
    if (c === 1) equationParts.push("+ x");
    else if (c === -1) equationParts.push("- x");
    else equationParts.push(`${c > 0 ? "+" : "-"} ${Math.abs(c)}x`);
  }

  if (d !== 0) {
    equationParts.push(`${d > 0 ? "+" : "-"} ${Math.abs(d)}`);
  }

(document.getElementById("equation") as HTMLInputElement).textContent =
  equationParts.join(" ") + " = 0";

  let p = (3 * a * c - b**2) / (3 * a**2);
  let q = ((27 * a * a * d) - (9*a*b*c) + (2*b**3)) / (27*a**3);
  const discriminant: number = (q / 2) * (q / 2) + (p / 3) * (p / 3) * (p / 3);

  console.log(discriminant)
  console.log(p)
  console.log(q)

  let root1: number | string;
  let root2: number | string;
  let root3: number | string;

  if (discriminant < 0) {
    const roots: Array<number> = trigonometricMethod(a, b, p, q);

    root1 = roots[0];
    root2 = roots[1];
    root3 = roots[2];
    
  } else if (discriminant > 0) {
    
    root1 = cardanosMethod(a, b, p, q);
    root2 = "Complex";
    root3 = "Complex";

  } else {
    if (p === 0 && q === 0) {
      root1 = cardanosMethod(a, b, p, q);
      root2 = cardanosMethod(a, b, p, q);
      root3 = cardanosMethod(a, b, p, q);

    } else {
      root1 = cardanosMethod(a, b, p, q);
      root2 = Math.cbrt(q / 2) - (b / (3 * a));
      root3 = Math.cbrt(q / 2) - (b / (3 * a));
    }
}

const fmt = (r: number | string) =>
  typeof r === "number" ? r.toFixed(2) : r;
(document.getElementById("p") as HTMLTableCellElement).textContent = fmt(p);
(document.getElementById("q") as HTMLTableCellElement).textContent = fmt(q);
(document.getElementById("root1") as HTMLTableCellElement).textContent = fmt(root1);
(document.getElementById("root2") as HTMLTableCellElement).textContent = fmt(root2);
(document.getElementById("root3") as HTMLTableCellElement).textContent = fmt(root3);
(document.getElementById("discriminant") as HTMLTableCellElement).textContent = fmt(discriminant);

const realRoots = [root1, root2, root3].filter(r => typeof r === "number") as number[];
drawGraph(a, b, c, d, realRoots);

})

function trigonometricMethod(a: number, b: number, p: number, q: number) {
  const rval: Array<number>= new Array();
  const theta: number =
    (1 / 3) * Math.acos(-q / (2 * Math.sqrt(-(p / 3) * (p / 3) * (p / 3))));

  rval[0] = Number((2 * Math.sqrt(-p / 3) * Math.cos(theta) - b / (3 * a)).toFixed(2));
  rval[1] = Number((2 * Math.sqrt(-p / 3) * Math.cos(theta + (2 * Math.PI) / 3) - b / (3 * a)).toFixed(2));
  rval[2] = Number((2 * Math.sqrt(-p / 3) * Math.cos(theta + (4 * Math.PI) / 3) - b / (3 * a)).toFixed(2));
  return rval;

}

function cardanosMethod(a: number, b: number, p : number, q: number) {
  return (
    Math.cbrt(
      -q / 2 + Math.sqrt((q / 2) * (q / 2) + (p / 3) * (p / 3) * (p / 3)),
    ) +
    Math.cbrt(
      -q / 2 - Math.sqrt((q / 2) * (q / 2) + (p / 3) * (p / 3) * (p / 3)),
    ) -
    b / (3 * a)
    )

}

function drawGraph(a: number, b: number, c: number, d: number, roots: number[]): void {
  const minX: number = -10;
  const maxX: number = 10;
  const minY: number = -10;
  const maxY: number = 10;

  const canvas = document.getElementById("graph") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");

  if (!ctx) return;

  const scaleX: number = canvas.width / (maxX - minX);
  const scaleY: number = canvas.height / (maxY - minY);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw axes
  ctx.strokeStyle = "black";
  ctx.beginPath();
  ctx.moveTo(0, canvas.height / 2);
  ctx.lineTo(canvas.width, canvas.height / 2);
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();

  // Draw vertical grid lines
  ctx.strokeStyle = "lightGray";
  for (let x = minX; x <= maxX; x++) {
    const pixelX = (x - minX) * scaleX;
    ctx.beginPath();
    ctx.moveTo(pixelX, 0);
    ctx.lineTo(pixelX, canvas.height);
    ctx.stroke();
  }

  // Draw horizontal grid lines
  for (let y = minY; y <= maxY; y++) {
    const pixelY = canvas.height - (y - minY) * scaleY;
    ctx.beginPath();
    ctx.moveTo(0, pixelY);
    ctx.lineTo(canvas.width, pixelY);
    ctx.stroke();
  }

  // Draw cubic function
  ctx.strokeStyle = "red";
  ctx.beginPath();

  let isFirstPoint = true;

  for (let i = 0; i < canvas.width; i++) {
    const x = minX + i / scaleX;
    const y = a * x ** 3 + b * x ** 2 + c * x + d;
    const canvasY = canvas.height / 2 - y * scaleY;

    if (isFirstPoint) {
      ctx.moveTo(i, canvasY);
      isFirstPoint = false;
    } else {
      ctx.lineTo(i, canvasY);
    }
  }

  ctx.stroke();

  // Draw roots
  ctx.fillStyle = "blue";
  console.log(roots);

  for (let i = 0; i < 3; i++) {
    const r = roots[i];
    if (!isFinite(r)) continue;

    const pixelX = (r - minX) * scaleX;
    const pixelY = canvas.height / 2;

    ctx.beginPath();
    ctx.arc(pixelX, pixelY, 5, 0, Math.PI * 2);
    ctx.fill();
  }
}