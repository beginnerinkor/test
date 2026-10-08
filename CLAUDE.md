# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Language

- Always write responses, results and explanations to the user in Korean (한국어), even when the request or the source material is in English.
- Code, identifiers, file names, commands and technical terms may stay in their original form.

## Shortcuts

- When the user's whole message is `cgo`, switch this session to Auto mode (`auto`, same as the CLI flag `claude --enable-auto-mode`) with the `set_session_permission_mode` tool (session `self`), then confirm the switch in one short line.
- `/changelog [요약]` adds an entry to `CHANGELOG.md`. The project skill lives in `.claude/skills/changelog/SKILL.md`; edit that file to change how it works.

## Interview before implementing

- Before implementing any new feature or service, interview the user first and do not write code until it is done.
  - Cover technical implementation, UI/UX, concerns and trade-offs. Ask deep, non-obvious questions grounded in what the user already said, not generic ones.
  - Tell the user the total number of questions at the start (default: 5).
  - Ask with the `AskUserQuestion` tool. Each question has 4 multiple-choice options plus 1 free-text answer (the tool's built-in "Other" field).
  - When one option is recommended, list it first and add "(추천)" to its label.
- After the interview, write a plan spec to a file under `docs/` (for example `docs/<name>-spec.md`). Record the answers, scope, technical design, UX, concerns, trade-offs and open decisions. Then wait for the user to approve it before implementing.
- Exception: if the user says to skip the interview, for example "인터뷰는 빼줘" or "인터뷰는 스킵해줘", skip it and implement directly.
- Small fixes to existing code, such as bug fixes, wording or style tweaks, don't need an interview.

## Testing

- Whenever you write or change code, you must also write or update test code that covers it. A code change without tests is not finished.
- Run the tests and confirm they pass before reporting the work as done. If they fail, report the failure with its output.
- Tests use Node's built-in `node:test` (no dependencies) and live in `tests/*.test.mjs`. They read the HTML files as text and check their structure.
  - All tests: `node --test "tests/*.test.mjs"` (Node 24 treats a bare `tests/` as a module path and fails)
  - A single test: `node --test --test-name-pattern "<test name>" tests/aisync.test.mjs`

## Overview

This folder has two self-contained web pages (Korean UI) with inline CSS. There is no build step, package manager or linter. To run either one, open the file in a browser.

- `calculator.html`: a calculator with inline JS, published as an Artifact (see below).
- `aisync.html`: a one-page landing page for AI싱크클럽, a local file only (not an Artifact). It is a full HTML document (`<!doctype>`, `<html lang="ko">`, `<head>`, `<body>`) with no JS, and it uses the same three-block dark-mode token pattern described below. Its CTA buttons point to the placeholder `#apply`; replace it with the real sign-up link when one exists.

It is also published as a claude.ai Artifact (https://claude.ai/artifact/T6rey6mK52iVdd95vTBbq5). Republish the same file path to update that URL instead of creating a new artifact.

## Artifact constraints that shape the file

- The file has no `<!doctype>`, `<html>`, `<head>` or `<body>` tags on purpose, because the Artifact publisher wraps it in its own skeleton. It starts with `<title>`, then `<link>` and `<style>`. Keep it that way.
- The only external resource is Google Fonts (Chivo Mono, Figtree). The Artifact CSP blocks other hosts.
- Colors are CSS tokens on `:root`, redefined for dark mode twice: under `@media (prefers-color-scheme: dark)` guarded by `:root:not([data-theme="light"])`, and under `:root[data-theme="dark"]`. When you add a color, add it to all three blocks.

## Calculator logic (inline `<script>`)

- `press(k)` handles every input. Mouse clicks go through the `data-k` attribute on each key, and the keyboard goes through `keyMap`. Operator keys use the Unicode symbols `−` and `×`, not ASCII `-` and `*`.
- `fmt()` rounds results to 12 significant digits and switches to exponent notation for very large or very small values. `pretty()` adds thousands separators for display only. Don't feed `pretty()` output back into calculations.