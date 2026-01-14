# Known Issues

## Live Execution Logs (UI)

- Backend execution logs are generated correctly and visible in server output.
- Dashboard execution stream UI is implemented and polling correctly.
- Current issue: logs are not yet propagating from backend buffer to frontend.
- Root cause identified as module import identity mismatch.
- Tracked for resolution in next iteration.

This does not affect core functionality (recon, assessment, reporting).
