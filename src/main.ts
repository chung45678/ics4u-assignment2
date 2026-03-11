import "./style.css"

(document.getElementById("solveCubic")as HTMLButtonElement).addEventListener("click", () => {
  const a = Number((document.getElementById("a-value") as HTMLInputElement).value);
  const b = Number((document.getElementById("b-value") as HTMLInputElement).value);
  const c = Number((document.getElementById("c-value") as HTMLInputElement).value);
  const d = Number((document.getElementById("d-value") as HTMLInputElement).value);
  
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

(document.getElementById("root1") as HTMLTableCellElement).textContent = fmt(root1);
(document.getElementById("root2") as HTMLTableCellElement).textContent = fmt(root2);
(document.getElementById("root3") as HTMLTableCellElement).textContent = fmt(root3);
(document.getElementById("discriminant") as HTMLTableCellElement).textContent = fmt(discriminant);

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



