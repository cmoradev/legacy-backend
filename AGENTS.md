# AGENTS.md

## Purpose

- Guide for agentic coding tools operating in this repository.
- Repository-specific commands and coding conventions.
- Prefer nearby local patterns when uncertain.

## Repository Snapshot

- Framework: NestJS 7
- Language: TypeScript
- ORM: TypeORM 0.2
- Database: MySQL
- Source root: `src/`
- Build output: `dist/`
- Unit tests: `src/**/*.spec.ts`
- E2E tests: `test/**/*.e2e-spec.ts`
- Linting: ESLint
- Formatting: Prettier

## Cursor / Copilot Rule Files

- `.cursor/rules/`: not found
- `.cursorrules`: not found
- `.github/copilot-instructions.md`: not found
- No additional Cursor/Copilot overlays currently.

## Environment and Runtime

- Runtime env file pattern is `${NODE_ENV}.env`.
- If `NODE_ENV` is unset, default is `development`.
- `src/main.ts` loads env via `dotenv.parse(fs.readFileSync(...))`.
- Keep `.env.example` aligned with required variables.
- Critical keys include `API_PORT`, DB credentials, invoice/storage paths.
- Some workflows assume writable directories under `/var/www` (see `README.md`).

## Install

```bash
npm install
```

## Build and Run Commands

```bash
npm run build
npm run start
npm run start:dev
npm run start:debug
npm run start:prod
```

Notes:

- `prebuild` clears `dist` and `tsconfig.build.tsbuildinfo`.
- `start:prod` expects compiled output in `dist/`.

## Lint and Format Commands

```bash
npm run lint
npm run format
```

Notes:

- `npm run lint` uses `--fix`.
- Re-run lint after broad edits.

## Test Commands

```bash
npm run test
npm run test:watch
npm run test:cov
npm run test:debug
npm run test:e2e
```

## Single-Test Workflows (Important)

Run one unit test file:

```bash
npm run test -- subjects/subjects.service.spec.ts
```

Run one unit test by name:

```bash
npm run test -- --testNamePattern="should be defined"
```

Run one e2e file:

```bash
npm run test:e2e -- app.e2e-spec.ts
```

Run one e2e test by name:

```bash
npm run test:e2e -- --testNamePattern="/ \(GET\)"
```

Tips:

- Unit Jest uses `rootDir: src`, so unit test paths are usually `src`-relative.
- Add `--runInBand` for flaky/order-sensitive debugging.

## TypeORM / DB Commands

```bash
npm run typeorm -- <command>
npm run typeorm:migrate -- -n AddSomething
npm run typeorm:run
npm run typeorm:revert
npm run orm:run
npm run orm:revert
npm run orm:drop
npm run orm:sync
```

## Architecture Conventions

- Feature-first modules: `system`, `school-colegio-ingles`, `mini-store`, `academy`, etc.
- Typical layout: `*.module.ts`, `*.controller.ts`, `*.service.ts`, `entities/`, `dto/`.
- Many controllers are implemented with `@nestjsx/crud`.
- Many services extend `TypeOrmCrudService<Entity>`.
- Global auth guard is configured in `AppModule` with `APP_GUARD` + `JwtGuard`.

## Code Style Guidelines

### Imports

- Keep import ordering consistent with neighboring files.
- Common order: framework imports, third-party imports, local relative imports.
- Keep relative import strategy; avoid ad hoc path aliases.
- For repositories, use `@InjectRepository(Entity, ColegioDBNameConnection)`.

### Formatting

- Prettier config: `singleQuote: true`, `trailingComma: all`.
- Match local semicolon/spacing style in touched files.
- Keep decorator metadata readable; multiline objects are preferred when dense.

### Types

- TS config is non-strict (`noImplicitAny: false`, `strictNullChecks: false`).
- `allowJs` is enabled.
- Prefer explicit types on public controller/service methods.
- Prefer DTO classes for request payloads.
- Keep `class-validator` decorators on DTOs when applicable.
- Use `Partial<T>` for update-like payloads when aligned with local patterns.

### Naming

- Classes/services/controllers/entities/modules: PascalCase.
- Files/folders: mostly kebab-case with legacy exceptions.
- New DTO classes should end with `Dto`.
- Keep route/domain naming consistent inside the touched module.

### Error Handling

- Prefer Nest exceptions (`BadRequestException`, `UnauthorizedException`, `NotFoundException`).
- In controllers using `@Res()`, preserve explicit response style already in place.
- Do not silently swallow errors.
- Keep message language/style consistent with nearby code.

### CRUD and Query Patterns

- Preserve existing `@Crud` defaults (filters, joins, excludes, limits).
- Keep sensitive fields excluded from responses (for example passwords).
- Preserve soft-delete/restore behavior where already implemented.

### Testing Style

- Existing specs are often smoke-style; match local style unless intentionally expanding coverage.
- Follow nearby `describe` and `it` naming conventions.
- Keep tests deterministic and avoid shared mutable dependencies.

## Agent Checklist Before Finishing

For typical changes:

```bash
npm run lint
npm run test -- <target-spec-or-pattern>
```

For broad/risky changes:

```bash
npm run test
npm run test:e2e
```

If commands fail due to environment constraints, report exact blockers and validations.
