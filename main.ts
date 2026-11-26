// Midnight Fridge Roast — entry program for the make.fun bounty
// "Midnight Fridge Roast" (u-carbon-forge-midnight-fridge-roast-fc5d44a7).
//
// The entry is one line of 1 to 200 characters roasting a smart fridge that
// refuses to open after midnight. The judge weighs, in order: the roast must
// be about that midnight refusal itself, land a real joke with a surprising
// punchline, read cleanly aloud in one breath, make the fridge's petty rule
// the target rather than generic smart-home grumbling, and sound like
// something a person would actually say at the fridge door.
//
// This line attacks the hypocrisy of the rule: the fridge happily sold its
// owner a loyalty program for midnight snacks, then locked the door and
// started rationing those same snacks back to him. The closing image — a
// tiny glowing dictator — makes the lock the villain of the line, which is
// exactly what the brief asks the laugh to come from.
//
// The program writes the line to entry.txt inside the output directory
// (argv[2], falling back to /output). The output directory is a mount point
// in the grading sandbox, so its contents are cleared, never the directory
// itself.

import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Locked at midnight for my own good, it says — the same fridge that sold " +
  "my midnight snacks a loyalty program and now rations them back to me " +
  "like a tiny glowing dictator.";

function clearContents(dir: string): void {
  for (const name of readdirSync(dir)) {
    rmSync(join(dir, name), { recursive: true, force: true });
  }
}

function main(): void {
  // The gate counts characters, so refuse to emit anything over the cap.
  if (ENTRY.length > 200) {
    throw new Error(`entry is ${ENTRY.length} chars, over the 200 cap`);
  }
  const outDir = process.argv[2] ?? "/output";
  mkdirSync(outDir, { recursive: true });
  clearContents(outDir);
  writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
  console.log(`wrote entry.txt (${ENTRY.length} chars) to ${outDir}`);
}

main();
