---
name: changelog
description: Add an entry for recent changes to CHANGELOG.md in this project. Use when the user runs /changelog or asks to record changes in the changelog.
argument-hint: "[변경 내용 요약 (생략하면 이번 세션의 변경을 정리)]"
disable-model-invocation: true
---

# /changelog

Record changes in `CHANGELOG.md` at the project root. Write in Korean, per CLAUDE.md.

## 1. Collect the changes

- If `$ARGUMENTS` is not empty, use it as the source of the entry. Tidy the wording but keep the meaning.
- If it is empty, gather the changes made in this session: the files created, edited or deleted, and why.
- This folder may not be a git repository, and git may not be installed. Try `git log` / `git diff` only if `git` is available. Otherwise, rely on this session's work, and on the file modification times in the project root, `docs/` and `tests/` (`Get-ChildItem -Recurse -File | Sort-Object LastWriteTime -Descending`).
- Skip changes that don't matter to a reader: memory files, files in the scratchpad, and edits that only reformat.
- If you can't tell what changed, ask the user in one line instead of guessing.

## 2. Write the entry

- If `CHANGELOG.md` doesn't exist, create it with the header below.
- Put the new entry at the top, under the header. Use today's date as `YYYY-MM-DD`.
- If an entry for today already exists, add the items to it. Don't make a second heading for the same date, and don't repeat an item that is already there.
- Use only the categories that have items, in this order: `추가`, `변경`, `수정`, `삭제`.
- Write each item as one line that says what changed and where, and link the file: `- 다크 모드 토큰을 추가 ([aisync.html](aisync.html))`.

```markdown
# Changelog

이 프로젝트의 주요 변경 사항을 날짜순(최신이 위)으로 기록합니다.

## 2026-10-08

### 추가
- ...

### 변경
- ...
```

## 3. Report

Show the user the entry you added, and say whether you created the file or updated it. Don't touch other files.
