import {exec} from "child_process";
import * as core from '@actions/core';

const KUBERNETES_REGEX = /^K8S_APP_/;
const fetchEnvironmentVariables = (envs: { [key: string]: string }): string => {
    const keys = Object.keys(envs);
    return keys.map((key) => {
        if (key.startsWith('K8S_APP')) {
            return `--set jwtSecretData.${key.replace(KUBERNETES_REGEX, '')}="${envs[key]}"`;
        }
        return '';
    }).join(' ');

}

export const deploy = () => {

    const secrets = JSON.parse(process.env.allSecrets);
    const vars = JSON.parse(process.env.allVars);
    const inputs = JSON.parse(process.env.allInputs);
    const repoName = process.env.GITHUB_REPOSITORY.split('/')[1];
    const helmValues = [fetchEnvironmentVariables(secrets), fetchEnvironmentVariables(vars)].join(' ');
    const helmCommand = `helm upgrade --install celebrate-deployment-${inputs['app-name']} -f /__w/k8s-repo/k8s-repo/.github/.values.yaml celebrate/celebrate-deployment ${helmValues} --set appName=${inputs['app-name']} --set prefix=${inputs['app-name']} --set image.tag=${inputs['branch-name']}  --namespace  ${repoName} --create-namespace`
    exec(helmCommand, (err, stdout, stderr) => {
        if (err) {
            console.log(`error: ${err.message}`);
            core.setFailed(err.message);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);

    });
}
