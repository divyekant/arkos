<!-- APOLLO:START - Do not edit this section manually -->
## Project Conventions (managed by Apollo)
<!-- This section defines the standard development practices for the arkos project -->
- Language: typescript, package manager: npm
  <!-- Primary tech stack: TypeScript with npm for dependency management -->
- Commits: conventional style (feat:, fix:, chore:, etc.)
  <!-- All commits must follow conventional commit format for clarity and automation -->
- Never auto-commit — always ask before committing
  <!-- Manual approval required to prevent accidental commits -->
- Branch strategy: feature branches
  <!-- Development uses feature branch workflow -->
- Code style: concise, comments: minimal
  <!-- Prioritize readable code over verbose comments -->
- Testing: TDD — write tests before implementation
  <!-- Test-driven development: tests are written first, then code follows -->
- Test framework: vitest
  <!-- Use vitest for all unit and integration testing -->
- Run tests before every commit
  <!-- Automated quality gate: no commits without passing tests -->
- Product testing: use Delphi for ui, api, cli surfaces
  <!-- Delphi tool is the standard for testing all user-facing interfaces -->
- Design before code: always run brainstorming/design phase first
  <!-- Design phase is mandatory and precedes implementation -->
- Design entry: invoke conductor skill for all design/brainstorm work
  <!-- Use conductor capability for structured design/brainstorm sessions -->
- Code review required before merging
  <!-- Pull request review is mandatory; no direct merges to main branches -->
- Maintain README.md
  <!-- Keep project README current with setup and usage instructions -->
- Maintain CHANGELOG.md
  <!-- Track all user-facing changes in CHANGELOG following semver -->
- Maintain a Quick Start guide
  <!-- Provide expedited onboarding documentation -->
- Maintain architecture documentation
  <!-- Document system design and component relationships -->
- Track decisions in docs/decisions/
  <!-- Record significant architectural decisions in decision records -->
- Update docs on: feature
  <!-- Update documentation when new features are added -->
- Versioning: semver
  <!-- Follow semantic versioning for releases -->
- Check for secrets before committing
  <!-- Scan for hardcoded credentials and API keys before any commit -->
- Dev runtime: local
  <!-- Project runs locally without containers -->
- Start: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`
- Test: `npx vitest run`
<!-- APOLLO:END -->
