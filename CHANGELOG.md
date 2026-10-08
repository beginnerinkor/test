# Changelog

이 프로젝트의 주요 변경 사항을 날짜순(최신이 위)으로 기록합니다.

## 2026-10-08

### 추가
- 구현 전 인터뷰 규칙 추가: 질문 수를 먼저 알리고, 문항마다 객관식 4개와 주관식 1개를 두고, 추천 항목을 표시하고, 끝나면 spec 파일을 작성해요. "인터뷰는 빼줘" 또는 "인터뷰는 스킵해줘"라고 하면 생략해요 ([CLAUDE.md](CLAUDE.md))
- `/changelog` 명령 추가: `CHANGELOG.md`에 변경 항목을 기록해요 ([.claude/skills/changelog/SKILL.md](.claude/skills/changelog/SKILL.md))
- 변경 기록 파일 추가 ([CHANGELOG.md](CHANGELOG.md))

## 2026-10-01

### 추가
- AI싱크클럽 커뮤니티 v0 plan spec 작성: 핵심 기능은 스터디 모임 신청·일정 ([docs/aisync-community-spec.md](docs/aisync-community-spec.md))

## 2026-09-30

### 추가
- AI싱크클럽 원페이지 랜딩페이지 추가: 다크 모드와 모바일 레이아웃을 지원하고, CTA는 자리표시자 `#apply`를 가리켜요 ([aisync.html](aisync.html))
- 랜딩페이지 구조 테스트 6개 추가 (`node:test`) ([tests/aisync.test.mjs](tests/aisync.test.mjs))
- `cgo` 단축 명령 추가: 세션을 Auto 모드로 전환해요 ([CLAUDE.md](CLAUDE.md))

### 변경
- 테스트 실행 방법과 프로젝트 개요에 랜딩페이지를 반영 ([CLAUDE.md](CLAUDE.md))
