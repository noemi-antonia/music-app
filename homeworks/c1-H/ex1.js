class AngajatIT {

    constructor(CNP, nume, prenume, vechime, departament){
        this.CNP=CNP;
        this.nume=nume;
        this.prenume=prenume;
        this.vechime=vechime;
        this.departament=departament;
    }

    afiseazaVarsta(){
        /*
        CNP from string to array of numbers
        I take the first 7 digits because I will use only these.
        */
        const CNPArray = this.CNP.split("",7).map(x=>parseInt(x));


        //destructuring
        const [c,y1,y2,m1,m2,d1,d2] = CNPArray;


        /*
        century according to first digit from CNP
        source of information: http://legislatie.just.ro/Public/DetaliiDocumentAfis/188152
        */
        let secol;

        switch (c){
            case 1:
            case 2:
                secol = 19;
                break;
            case 3:
            case 4:
                secol = 18;
                break;
            case 5:
            case 6:
                secol = 20;
                break;
        }

        
        const anulNasterii = secol * 100 +  y1 * 10 + y2;
        //in the case of birth month, I subtract 1, because in method setFullYear(), monthValue represents an integer between 0 and 11  
        const lunaNasterii = ( m1*10 + m2 ) - 1;
        const ziuaNasterii = d1*10 + d2;

        console.log(`Data nasterii: ${ziuaNasterii}.${lunaNasterii + 1}.${anulNasterii}`);

        const dataNasterii = new Date();
        dataNasterii.setFullYear(anulNasterii, lunaNasterii, ziuaNasterii);


        /*
        I calculate the difference between today and birthdate in milliseconds,
        the result I convert to Date again, and subtract 1970 from the Year, to get the age,
        because both methods returns the numbers of milliseconds since the Unix Epoch (January 1,1970)
        */
        let diferenta = Date.now() - dataNasterii.getTime();
        diferenta = new Date(diferenta);

        const varsta = diferenta.getFullYear()-1970;

        console.log(`Varsta: ${varsta} ani`);
        
    }

    afiseazaAnulAngajarii(){
        const dataDeAzi = new Date();
        const anulCurent = dataDeAzi.getFullYear();

        console.log(`Vechime: ${this.vechime} ani \nAnul angajarii: ${anulCurent - this.vechime}`);
    }

    lucreaza(){
        console.log("Neimplementat");
    }

}

class Developer extends AngajatIT{
    constructor(CNP, nume, prenume, vechime){
        super(CNP, nume, prenume, vechime, "dev")
    }
    
    lucreaza(){
        console.log("Scrie cod");
    }
}

class QA extends AngajatIT{
    constructor(CNP, nume, prenume, vechime){
        super(CNP, nume, prenume, vechime, "QA")
    }
    
    lucreaza(){
        console.log("Testeaza software");
    }
}

const test = new Developer(
    "2960320245085",
    "Pongracz",
    "Noemi",
    3
);

test.afiseazaVarsta();
test.afiseazaAnulAngajarii();
test.lucreaza();
