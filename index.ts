import "./style.css";
import p5 = require("p5");

enum Tree {
  Basic,
  Random,
  Colored,
}
let tree: Tree = Tree.Basic;

interface ILine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: number;
  width?: number;
}
const basicTreeLines: ILine[] = [];
const randomTreeLines: ILine[] = [];
const coloredTreeLines: ILine[] = [];

export let p: p5;
new p5((p5: p5) => {
  p = p5;
  p.setup = setup;
  p.draw = draw;
});

async function setup() {
  p.createCanvas(p.windowWidth, p.windowHeight);
  generateBasicTree();
  generateRandomTree();
  generateColoredTree();
}

function draw() {
  p.background("white");
  p.stroke("black");
  switch (tree) {
    case Tree.Basic:
      drawTree(basicTreeLines);
      break;
    case Tree.Random:
      drawTree(randomTreeLines);
      break;
    case Tree.Colored:
      drawTree(coloredTreeLines);
      break;
  }
}

function drawTree(branches: ILine[]) {
  p.colorMode(p.HSL);
  p.strokeCap(p.SQUARE);
  for (const branch of branches) {
    p.stroke(p.color(100, 100, branch.color ?? 5));
    p.strokeWeight(branch.width ?? 1);
    p.line(branch.x1, branch.y1, branch.x2, branch.y2);
  }
}

function generateBasicTree() {
  const level = 0;
  const angle = -90;
  const branchLength = 100;
  const maxLevel = 11;

  basicTreeLines.splice(0, basicTreeLines.length);
  branch(300, 500, angle, branchLength, level);

  function branch(x1: number, y1: number, angle: number, branchLength: number, level: number) {
    if (level < maxLevel) {
      // Endkoordinaten berechnen
      var x2 = x1 + Math.cos((angle * Math.PI) / 180) * branchLength;
      var y2 = y1 + Math.sin((angle * Math.PI) / 180) * branchLength;

      // Linie zeichnen
      basicTreeLines.push({ x1, y1, x2, y2 });

      // zwei weitere Äste mit verändertem Winkel malen
      branch(x2, y2, angle - 20, branchLength * 0.8, level + 1);
      branch(x2, y2, angle + 20, branchLength * 0.8, level + 1);
    }
  }
}

function generateRandomTree() {
  const level = 0;
  const angle = -90;
  const branchLength = 100;
  const maxLevel = 13;
  const angleChange = 20;
  const branchLengthChange = 0.77;
  const randomAngleChange = 15;
  const randomBranchLength = 10;

  randomTreeLines.splice(0, randomTreeLines.length);
  branch(300, 500, angle, branchLength, level);

  function branch(x1: number, y1: number, angle: number, branchLength: number, level: number) {
    if (level < maxLevel) {
      // Endkoordinaten berechnen
      var x2 = x1 + Math.cos((angle * Math.PI) / 180) * branchLength;
      var y2 = y1 + Math.sin((angle * Math.PI) / 180) * branchLength;

      // Linie zeichnen
      randomTreeLines.push({ x1, y1, x2, y2 });

      // zwei weitere Äste mit verändertem Winkel malen
      branch(
        x2,
        y2,
        angle - angleChange + (Math.random() - 0.5) * randomAngleChange,
        branchLength * branchLengthChange + (Math.random() - 0.5) * randomBranchLength,
        level + 1
      );
      branch(
        x2,
        y2,
        angle + angleChange + (Math.random() - 0.5) * randomAngleChange,
        branchLength * branchLengthChange + (Math.random() - 0.5) * randomBranchLength,
        level + 1
      );
    }
  }
}

function generateColoredTree() {
  const level = 0;
  const angle = -90;
  const branchLength = 100;
  const maxLevel = 11;
  const angleChange = 20;
  const branchLengthChange = 0.77;
  const randomAngleChange = 15;
  const randomBranchLength = 10;
  const brightness = 5;

  coloredTreeLines.splice(0, coloredTreeLines.length);
  branch(300, 500, angle, branchLength, level);

  function branch(x1: number, y1: number, angle: number, branchLength: number, level: number) {
    if (level < maxLevel) {
      // Endkoordinaten berechnen
      var x2 = x1 + Math.cos((angle * Math.PI) / 180) * branchLength;
      var y2 = y1 + Math.sin((angle * Math.PI) / 180) * branchLength;

      // Linie zeichnen
      coloredTreeLines.push({ x1, y1, x2, y2, color: brightness + level * 3, width: maxLevel - level });

      // zwei weitere Äste mit verändertem Winkel malen
      branch(
        x2,
        y2,
        angle - angleChange + (Math.random() - 0.5) * randomAngleChange,
        branchLength * branchLengthChange + (Math.random() - 0.5) * randomBranchLength,
        level + 1
      );
      branch(
        x2,
        y2,
        angle + angleChange + (Math.random() - 0.5) * randomAngleChange,
        branchLength * branchLengthChange + (Math.random() - 0.5) * randomBranchLength,
        level + 1
      );
    }
  }
}

const basicButton = document.getElementById("basic");
const randomButton = document.getElementById("random");
const coloredButton = document.getElementById("colored");

basicButton.onclick = () => {
  tree = Tree.Basic;
  generateBasicTree();
};
randomButton.onclick = () => {
  tree = Tree.Random;
  generateRandomTree();
};
coloredButton.onclick = () => {
  tree = Tree.Colored;
  generateColoredTree();
};
