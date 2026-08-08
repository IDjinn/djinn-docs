import { source } from "@/lib/source";

export const revalidate = false;

function stringifyName(name: unknown): string {
  if (typeof name === "string") return name;
  return String(name ?? "");
}

type TreeNode =
  | { type: "separator" }
  | { type: "page"; name: unknown; url: string; description?: unknown }
  | {
      type: "folder";
      name: unknown;
      index?: { name: unknown; url: string; description?: unknown };
      children: TreeNode[];
    };

function walkTree(node: TreeNode, lines: string[]): void {
  if (node.type === "separator") return;

  if (node.type === "folder") {
    if (node.index) {
      appendItem(node.index, lines);
    }
    for (const child of node.children) {
      walkTree(child, lines);
    }
    return;
  }

  appendItem(node, lines);
}

function appendItem(
  item: { name: unknown; url: string; description?: unknown },
  lines: string[],
): void {
  const title = stringifyName(item.name);
  const description =
    typeof item.description === "string" ? item.description : "";
  const mdxUrl = `${item.url}.mdx`;

  if (description) {
    lines.push(`- [${title}](${mdxUrl}): ${description}`);
  } else {
    lines.push(`- [${title}](${mdxUrl})`);
  }
}

export async function GET(req: Request) {
  const baseUrl = new URL(req.url).origin;
  const tree = source.getPageTree();
  const lines: string[] = [];

  lines.push("# Djinn Lang");
  lines.push("");
  lines.push(
    "> A fast, memory-safe programming language with C-like syntax, LLVM backend, and seamless C/C++ interop.",
  );
  lines.push("");

  lines.push("## Full Documentation");
  lines.push("");
  lines.push(
    `- [Complete Docs (llms-full.txt)](${baseUrl}/llms-full.txt): All documentation pages concatenated into a single file for LLM context.`,
  );
  lines.push("");

  for (const child of tree.children) {
    if (child.type === "folder") {
      const folderName = stringifyName(child.name);
      lines.push(`## ${folderName}`);
      lines.push("");
      walkTree(child, lines);
      lines.push("");
    } else if (child.type === "page") {
      lines.push("## Overview");
      lines.push("");
      appendItem(child, lines);
      lines.push("");
    }
  }

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
