{
  perSystem =
    { pkgs, playwrightEnv, ... }:
    {
      devShells.default = pkgs.mkShell {
        # Node runs vite, vitest and tsup, and ships the npm CLI that publishes. gh opens the pull requests.
        packages = [
          pkgs.bun
          pkgs.gh
          pkgs.nodejs
        ];
        env = playwrightEnv;
      };
    };
}
