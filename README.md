# Shorten Commit SHA

Export env and output sha with the shortened commit SHA.

## Example Usage

```yaml
jobs:
  job1:
    runs-on: ubuntu-latest
    name: Job 1
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - id: shorten_commit_sha
        uses: iendeavor/shorten-commit-sha@v1.0.0

      - run: |
          echo "env: ${{ env.shortened_commit_sha }}"
          echo "output: ${{ steps.shorten_commit_sha.outputs.shortened_commit_sha }}"

  job2:
    runs-on: ubuntu-latest
    name: Job 2
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - id: shorten_commit_sha
        uses: iendeavor/shorten-commit-sha@v1.0.0
        with:
          env_name: foo
          length: 8
          output_name: bar
          pull_request_github_sha: github.event.pull_request.head.sha # use the last commit to the head branch of the pull request, instead of the last merge commit of the pull request merge branch

      - run: |
          echo "env: ${{ env.foo }}"
          echo "output: ${{ steps.shorten_commit_sha.outputs.bar }}"
```

## Input

See [action.yml](https://github.com/iendeavor/shorten-sommit-sha/blob/main/action.yml)

| Name                    | Default                | Options                                              | Description                                                                                                                                        |
| ----------------------- | ---------------------- | ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| env_name                | 'shortened_commit_sha' |                                                      | The env name of the shortened sha.                                                                                                                 |
| length                  | '7'                    |                                                      | The length of the shortened sha.                                                                                                                   |
| output_name             | 'shortened_commit_sha' |                                                      | The output name of the shortened sha.                                                                                                              |
| pull_request_github_sha | "github.sha"           | "github.sha" \| "github.event.pull_request.head.sha" | The sha to be shortened for pull requests. See also: https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#pull_request |

## Sponsor

Thank you for using shorten-commit-sha action.

If this helps you, please consider by me a coffee:

- [Buy Me a Coffee](https://bmc.link/iendeavor)
- [PayPal](https://paypal.me/iendeavor)
