import fs from 'fs';
import cp from 'child_process';

const removeGitKeep = () => {
  const folders = ['artifacts', 'contracts'];

  for (const folder of folders) {
    const path = `./${folder}/.gitkeep`;
    if (fs.existsSync(path)) {
      fs.rmSync(path)
    }
  }
}

const copyDotEnv = () => {
  const envPath = './.env';
  if (!fs.existsSync(envPath) && fs.existsSync(envPath + '.example')) {
    fs.copyFileSync(envPath + '.example', envPath)
  }
}

const gitRepo = () => {
  const data = cp.execSync("git remote -v", { encoding: 'utf-8' });
  const fetch = data.split('\n').find(l => l.includes("fetch"));
  if (!fetch) {
    throw "Could not find remote repository";
  }
  const upstream = fetch.split('\t')[1].split(' ')[0];
  return upstream.split(':')[1].split('.')[0];
}

const repo = gitRepo()

const updatePackageJSON = () => {
  const data = fs.readFileSync('./package.json', { encoding: 'utf-8' })
  const pkg = JSON.parse(data);
  const author = repo.split('/')[0];

  pkg.name = repo;
  pkg.description = pkg.description.replace('%%PROJECT_NAME%%', author);
  pkg.repository = repo;
  pkg.author = author;

  fs.writeFileSync('./package.json', JSON.stringify(pkg, undefined, 2))
}

const updateReadme = () => {
  const author = repo.split('/')[0];
  const data = fs.readFileSync('./README.adoc', { encoding: 'utf-8' });
  const updated = data.replace('%%PROJECT_NAME%%', author);
  fs.writeFileSync('./README.adoc', updated)
}

removeGitKeep()
copyDotEnv()
updatePackageJSON()
updateReadme()
