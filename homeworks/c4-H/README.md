#### Rezolvare tema 4
1. Pentru a afișa câte degete ridicate are utilizatorul am tratat două cazuri:
 * ridicarea degetului mare, acela mișcându-se pe axa x: am verificat dacă landmarks[4], e în partea stângă sau dreaptă a landmarks[1] 
 * pentru ridicarea celorlalte 4 degete am stocat "TIP"-ul fiecărui deget într-un array și am verificat pentru fiecare dacă se pozitionează deasupra punctelor "PIP", 
în caz afirmativ am incrementat `nrOfRaisedFingers` și ulterior afișat pe ecran  
Am făcut asta doar pentru mâna stângă, însă logica se poate aplica și la cea dreaptă, cu diferența că la degetul mare trebuie să fie în partea cealaltă
2. Pentru exercițiul acesta am afișat div-ul cerut direct pe imaginea de la cameră, iar pentru colorare am adăugat doar o clasă cu numele gestului. 
Nu fac remove la clasă doar în momentul în care se recunoaște un alt gest.
