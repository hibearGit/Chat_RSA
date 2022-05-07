// Ce programme ne fonctionne qu'avec des entiers naturels
// demande les données à l'utilisateur et convertit les chaînes de caractères en entiers
var a = 64
var b = 5

// On sauvegarde les valeurs de a et b.
a0 = a;
b0 = b;

// Initialisations. On laisse invariant p*a0 + q*b0 = a et  r*a0 + s*b0 = b.
p = 1; q = 0;
r = 0; s = 1;

// La boucle principale:
while (b != 0) { 
  c = a % b;
  quotient = Math.floor(a/b);  //Javascript n'a pas d'opération de division entière.
  a = b;
  b = c;
  nouveau_r = p - quotient * r; nouveau_s = q - quotient * s;
  p = r; q = s;
  r = nouveau_r; s = nouveau_s;
}

// Affiche le résultat.

console.log("pgcd(" + a0 + "," + b0 + ")=" + p + "*" + a0 + "+(" + q + ")*" + b0 + "=" + a)