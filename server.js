const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 3000;

const terraformDirectory = "Terraform";
const terraformDB = "Terraform/DB";
const terraformWeb = "Terraform/Web";

let db_ip = "";
let db_port = "";
let db_login = "";
let db_password = "";

// Fonction pour exécuter une commande shell et retourner une promesse
function runCommand(command, cwd) {
    return new Promise((resolve, reject) => {
        exec(command, { cwd }, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing command: ${error.message}`);
                reject(error.message);
            }
            if (stderr) {
                console.error(`Error: ${stderr}`);
                reject(stderr);
            }
            resolve(stdout);
        });
    });
}

// Route pour servir le fichier HTML
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Route pour exécuter terraform apply
app.post('/terraform-apply', async (req, res) => {
    try {
        // sudo su stack
        // cd ~/terraform
        let out = await runCommand('sh test.sh', './');
        console.log(out);
        out = await runCommand('sh tmp.sh', './');
        console.log(out);

/*        await runCommand('sudo su stack', terraformDirectory);
        let output = await runCommand('cd ~/terraform', terraformDirectory);
        console.log(output);

        console.log('[DB] Initializing Terraform...');
        await runCommand('terraform init', terraformDB);

        console.log('[DB] Planning Terraform...');
        await runCommand('terraform plan -out=tfplan', terraformDB);

        console.log('Applying Terraform...');
        let output = await runCommand('terraform apply -auto-approve tfplan', terraformDB);

        ip = output.match(/ip: (.*)/)[1];
        db_port = output.match(/port: (.*)/)[1];
        login = output.match(/login: (.*)/)[1];
        password = output.match(/password: (.*)/)[1];
        
        res.send('Terraform apply completed successfully:\n' + output);

        console.log('[Web] Initializing Terraform...');
        await runCommand('terraform init', terraformWeb);

        console.log('[Web] Planning Terraform...');
        await runCommand('terraform plan -out=tfplan', terraformWeb);

        console.log('Applying Terraform...');
        output = await runCommand('terraform apply -auto-approve tfplan', terraformWeb);

        res.send('Terraform apply completed successfully:\n' + output);
        */
    } catch (error) {
        res.status(500).send('Error during Terraform apply:\n' + error);
    }
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
