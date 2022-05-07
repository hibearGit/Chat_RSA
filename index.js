/* Joue le rôle d'Alice : Elle prend deux nombres premiers p et q et un nombre c premier avec phi : (p-1)*(q-1) 
Elle construit avec ces données la clé publique (c,n) qui sera envoyer à Bob et la clé privé d (euclide étendu)*/

const net = require('net')
const client = new net.Socket()

const server = [];

/* Déclaration des constantes de la clé publique et de la clé privée */

const p = 5;
const q = 17;
const n = p*q; /*85*/
const phi = (p-1)*(q-1);
const c = 5 ;/*pgcd(c,phi)=1 ils sont premier entre eux*/
var d = 0; /*d va prendre sa vraie valeure une fois l'algorythme d'euclide etendu terminé (c'est la clé de déchiffrement)*/




//Permet de trouver la clé privé d.
function euclide_etendu(){
    // Ce programme ne fonctionne qu'avec des entiers naturels
    // demande les données à l'utilisateur et convertit les chaînes de caractères en entiers
    var a = c
    var b = phi

    // On sauvegarde les valeurs de a et b.
    a0 = a;
    b0 = b;

    // Initialisations. On laisse invariant p*a0 + q*b0 = a et  r*a0 + s*b0 = b.
    p1 = 1; q1 = 0;
    r = 0; s = 1;

        // La boucle principale:
    while (b != 0) { 
      c1 = a % b;
      quotient = Math.floor(a/b);  //Javascript n'a pas d'opération de division entière.
      a = b;
      b = c1;
      nouveau_r = p1 - quotient * r; nouveau_s = q1 - quotient * s;
      p1 = r; q1 = s;
      r = nouveau_r; s = nouveau_s;
    }

    // Affiche le résultat.

    d = p1 % phi; /*d est trouvé*/

}

//Permet une fois le message de Bob recu de le déchiffré
function déchiffrement(){
    euclide_etendu();
    var data_dechiffrée;
    data_dechiffrée = server[server.length - 1]**d%n;
    console.log("Message déchiffré = ",data_dechiffrée.toString());
}

/* Alice envoie la clé public (c,n) à Bob */
client.connect(8081, '192.168.1.24', function() {
    setTimeout(() => { client.write(c.toString()) }, 200);
    client.write(n.toString())
    });


//Permet à Alice de discuté avec Bob en utilisant le socket
command()
function command(){
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
        });


    readline.question('> ', name => {
        readline.close();
        /*Donnée que le client envoie*/

        /*Chiffrement RSA d'envoir : x**ccongrue à y modulo n*/

        name = name**c % n

        name_send = name.toString();

        console.log(name)
        client.write(name_send)
        
        command()
    })
} 


//Permet à Alice de recevoir le message de Bob et de l'envoyer à la fonction déchiffrement
client.on('data',data=>{
    /*Donnée envoyé par le serveur.*/
    console.log(`Message chiffré = ${data}`);
    server.push(data);
    déchiffrement()
})




/*Connection*/

connection()

client.on('error',err=>{
    console.log(err + "");
    connection()

})

function connection(){
    setTimeout(() => {
        client.connect({
            port : 8081,
            host : '192.168.1.24'
        
        })
      }, 2000)

}
