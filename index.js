/* Joue le rôle de bob : Il veut envoyer un message chiffré à Alice grâce à la clé publique d'Alice (c,n). */

const net = require('net')
const server = new net.createServer()

const connectedClients = [];
const datas = [];

//Déclaration des valeurs de la clé publique qu'il va recevoir d'Alice.
var c;
var n;



// Permet d'envoyer le message chiffré à Alice
command()
function command(){
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
        });


    readline.question('> ', name => {
        readline.close();
        connectedClients.forEach(client =>{
            /*Donnée que le serveur envoie*/
            name = name**c % n

            name_send = name.toString();

            console.log(name);
            client.write(name_send);

        })

        command()
    })
} 

//Change la valeur des variables c et n en les valeurs envoyer par Alice.
function nc(){
    console.log(datas.length)
    if(datas.length > 1){
    console.log('n = ',datas[0].toString());
    console.log('c = ',datas[1].toString());
    n = datas[0];
    c = datas[1];
    }
}


//Permet la connection au client par le socket.
server.on('connection', (client)=>{
    /*Connection*/
    console.log(client.remoteAddress);
    console.log("Le client est connecté");
    connectedClients.push(client);
    /************/


    /*Donnée envoyé par le client*/
    client.on('data',data =>{
        console.log(data.toString());
        datas.push(data);
        nc()
   })
})
server.listen(8081)