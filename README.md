# External IP Panel

## Development

- Install dependencies:

```
npm install
```

- Run:

```
yarn install
```

- To compile code as changes are made:

```
yarn watch
```

- Start a detached Grafana dock image, using the local directory as the plugins home:

```
cd gordonturner-listlist-panel
docker run -d -p 3000:3000 -v "$(pwd)"/dist:/var/lib/grafana/plugins --name=gordonturner-listlist-panel grafana/grafana:7.3.2
```

- NOTE: Check latest version here:
https://github.com/grafana/grafana/blob/master/CHANGELOG.md

- Restart grafana:

```
docker restart grafana-plugin
```
