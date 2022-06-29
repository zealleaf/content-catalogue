import shell from 'shelljs'
const pkg = process.argv[2] || 'leafvein-catalogue'
const folder = process.argv[3] || 'packages/catalogue'

const exec = shell.exec
const echo = shell.echo
const exit = shell.exit

if (exec(`pnpm --filter ${pkg} run build `).code !== 0) {
  echo('error: pnpm run build failed!')
  exit(1)
}

if (exec(`pnpm publish ${folder}`).code !== 0) {
  echo('error: pnpm publish failed!')
  exit(1)
}

exec(`echo publish success`)
