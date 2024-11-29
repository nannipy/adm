'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Dumbbell, 
  ChevronDown, 
  ChevronUp, 
  Target,
  BicepsFlexed,
  Footprints,
  Flame,
  Scaling,
  X
} from 'lucide-react';
import Image from 'next/image';

// Expanded exercise categories with more exercises
const exerciseCategories = [{
        category: 'Petto',
        icon: <Dumbbell className="text-blue-600" />,
        exercises: [
          { 
            name: 'Panca Piana', 
            link: '/esercizi/panca-piana',
            description: 'Un esercizio fondamentale per lo sviluppo dei muscoli pettorali, che coinvolge principalmente il grande pettorale e in misura minore i tricipiti e i deltoid anteriori.',
            photo: '/images/panca-piana.jpg',
            commonErrors: [
              'Sollevare i glutei dalla panca',
              'Spingere con una sola mezza asse',
              'Staccare la schiena dalla panca',
              'Usare un range of motion troppo corto'
            ],
            solutions: [
              'Mantenere i glutei sempre a contatto con la panca',
              'Spingere simmetricamente con entrambi i lati',
              'Mantenere la schiena completamente aderente alla panca',
              'Eseguire il movimento su tutto il range di movimento'
            ]
          },
          {
            name: 'Croci con Manubri',
            link: '/esercizi/croci-manubri',
            description: 'Esercizio di isolamento che lavora specificamente sui muscoli pettorali, favorendo lo stretching e la contrazione del muscolo.',
            photo: '/images/croci-manubri.jpg',
            commonErrors: [
              'Flettere troppo i gomiti',
              'Sollevare troppo peso',
              'Non mantenere i gomiti leggermente flessi',
              'Movimento non controllato'
            ],
            solutions: [
              'Mantenere un leggero angolo di gomito costante',
              'Scegliere un peso che consenta una corretta esecuzione',
              'Usare un peso che permetta di mantenere i gomiti sempre leggermente piegati',
              'Eseguire il movimento in modo lento e controllato'
            ]
          },
          {
            name: 'Panca Inclinata',
            link: '/esercizi/panca-inclinata',
            description: 'Esercizio che enfatizza la parte superiore del grande pettorale, coinvolgendo anche i tricipiti e i deltoidi anteriori.',
            photo: '/images/panca-inclinata.jpg',
            commonErrors: [
              'Non mantenere i piedi a terra',
              'Usare un angolo troppo ripido sulla panca',
              'Spingere troppo velocemente'
            ],
            solutions: [
              'Poggiare saldamente i piedi a terra',
              'Regolare la panca a un angolo di circa 30-45 gradi',
              'Eseguire una spinta lenta e controllata'
            ]
          },
          {
            name: 'Panca Declinata',
            link: '/esercizi/panca-declinata',
            description: 'Esercizio che concentra lo sforzo sulla parte inferiore del grande pettorale.',
            photo: '/images/panca-declinata.jpg',
            commonErrors: [
              'Non stabilizzare i piedi',
              'Usare un range of motion incompleto'
            ],
            solutions: [
              'Assicurarsi che i piedi siano saldi nei supporti',
              'Muoversi lungo tutto il range di movimento per un maggiore coinvolgimento muscolare'
            ]
          },
          {
            name: 'Dips',
            link: '/esercizi/dips',
            description: 'Esercizio a corpo libero per allenare i pettorali, i tricipiti e i deltoidi.',
            photo: '/images/dips.jpg',
            commonErrors: [
              'Scendere troppo velocemente',
              'Non mantenere una postura corretta',
              'Usare un range of motion limitato'
            ],
            solutions: [
              'Controllare la fase discendente del movimento',
              'Mantenere il busto inclinato leggermente in avanti',
              'Eseguire un movimento completo e fluido'
            ]
          },
          {
            name: 'Push-Up',
            link: '/esercizi/push-up',
            description: 'Esercizio base per il petto, adatto a tutti i livelli di allenamento.',
            photo: '/images/push-up.jpg',
            commonErrors: [
              'Non mantenere il corpo in linea',
              'Non scendere abbastanza',
              'Movimento troppo veloce'
            ],
            solutions: [
              'Tenere il corpo ben allineato, attivando il core',
              'Assicurarsi che il petto sfiori il pavimento',
              'Eseguire il movimento in modo lento e controllato'
            ]
          },
          {
            name: 'Croci ai Cavi',
            link: '/esercizi/croci-cavi',
            description: 'Esercizio che permette un movimento controllato per isolare i muscoli pettorali.',
            photo: '/images/croci-cavi.jpg',
            commonErrors: [
              'Non mantenere una postura stabile',
              'Portare i cavi troppo in alto o troppo in basso',
              'Non controllare il movimento'
            ],
            solutions: [
              'Tenere i piedi ben saldi a terra',
              'Allineare i cavi con i pettorali',
              'Eseguire il movimento lentamente per evitare oscillazioni'
            ]
          },
          {
            name: 'Piegamenti con Applauso',
            link: '/esercizi/piegamenti-applauso',
            description: 'Esercizio esplosivo per aumentare la forza e la potenza dei pettorali.',
            photo: '/images/piegamenti-applauso.jpg',
            commonErrors: [
              'Non esplodere abbastanza',
              'Perdere la posizione corretta',
              'Cadere troppo velocemente'
            ],
            solutions: [
              'Concentrare l’energia sulla spinta esplosiva',
              'Mantenere il core attivato per la stabilità',
              'Controllare la discesa dopo l’applauso'
            ]
          },
          {
            name: 'Press con Fascia Elastica',
            link: '/esercizi/press-elastico',
            description: 'Esercizio che permette di allenare il petto con tensione progressiva.',
            photo: '/images/press-elastico.jpg',
            commonErrors: [
              'Non fissare correttamente la fascia',
              'Utilizzare un movimento troppo veloce'
            ],
            solutions: [
              'Assicurarsi che la fascia sia ben ancorata',
              'Eseguire il movimento lentamente per massimizzare la tensione'
            ]
          },
          {
            name: 'Panca con Catene',
            link: '/esercizi/panca-catene',
            description: 'Variante della panca che aumenta progressivamente la resistenza.',
            photo: '/images/panca-catene.jpg',
            commonErrors: [
              'Sbilanciarsi durante il movimento',
              'Usare una posizione errata della catena'
            ],
            solutions: [
              'Mantenere una posizione stabile',
              'Assicurarsi che le catene siano ben distribuite per aumentare gradualmente il carico'
            ]
          },
          {
            name: 'Hex Press',
            link: '/esercizi/hex-press',
            description: 'Esercizio che enfatizza la contrazione dei muscoli pettorali premendo i manubri insieme.',
            photo: '/images/hex-press.jpg',
            commonErrors: [
              'Non premere abbastanza i manubri',
              'Usare un peso troppo pesante'
            ],
            solutions: [
              'Premere saldamente i manubri l’uno contro l’altro',
              'Scegliere un peso adeguato per eseguire correttamente l’esercizio'
            ]
          },
          {
            name: 'Floor Press',
            link: '/esercizi/floor-press',
            description: 'Esercizio che riduce il range di movimento, ideale per proteggere le spalle.',
            photo: '/images/floor-press.jpg',
            commonErrors: [
              'Non mantenere il controllo del peso',
              'Usare un movimento troppo rapido'
            ],
            solutions: [
              'Eseguire un movimento lento e controllato',
              'Utilizzare un carico gestibile'
            ]
          }
        ]
      },
      {
        category: 'Braccia',
        icon: <BicepsFlexed className="text-purple-600" />,
        exercises: [
          {
            name: 'Bicep Curl',
            link: '/esercizi/bicep-curl',
            description: 'Esercizio fondamentale per isolare e sviluppare i bicipiti.',
            photo: '/images/bicep-curl.jpg',
            commonErrors: [
              'Usare slancio per sollevare il peso',
              'Curvare la schiena durante il movimento',
              'Sollevare i pesi troppo velocemente senza controllo'
            ],
            solutions: [
              'Mantenere il corpo fermo durante l’esercizio',
              'Eseguire il movimento lentamente e controllato',
              'Tenere la schiena dritta e concentrarsi sulla contrazione del bicipite'
            ]
          },
          {
            name: 'Hammer Curl',
            link: '/esercizi/hammer-curl',
            description: 'Variante del bicep curl che lavora sui muscoli brachiali e sui bicipiti.',
            photo: '/images/hammer-curl.jpg',
            commonErrors: [
              'Sollevare i pesi con il corpo',
              'Non mantenere un angolo corretto del gomito',
              'Non controllare la discesa del peso'
            ],
            solutions: [
              'Mantenere i gomiti vicini al corpo durante l’esercizio',
              'Controllare la discesa dei pesi e non usare slancio',
              'Eseguire l’esercizio in modo lento e controllato'
            ]
          },
          {
            name: 'Tricep Dips',
            link: '/esercizi/tricep-dips',
            description: 'Esercizio per lavorare i tricipiti, utilizzando una panca o parallele.',
            photo: '/images/tricep-dips.jpg',
            commonErrors: [
              'Inarcare la schiena durante il movimento',
              'Non scendere abbastanza durante la discesa',
              'Non mantenere il controllo sulla fase di risalita'
            ],
            solutions: [
              'Tenere la schiena dritta e il core contratto',
              'Scendere fino a formare un angolo di 90 gradi nei gomiti',
              'Controllare il movimento e evitare di usare slancio'
            ]
          },
          {
            name: 'Overhead Tricep Extension',
            link: '/esercizi/overhead-tricep-extension',
            description: 'Esercizio per isolare i tricipiti, eseguito con manubrio sopra la testa.',
            photo: '/images/overhead-tricep-extension.jpg',
            commonErrors: [
              'Inarcare la schiena durante il movimento',
              'Non mantenere i gomiti fermi',
              'Usare un carico eccessivo'
            ],
            solutions: [
              'Tenere la schiena dritta e il core contratto',
              'Mantenere i gomiti vicini alla testa e non muoverli durante l’esercizio',
              'Usare un peso adeguato per una tecnica corretta'
            ]
          },
          {
            name: 'Close-Grip Bench Press',
            link: '/esercizi/close-grip-bench-press',
            description: 'Esercizio che coinvolge i tricipiti, eseguito sulla panca piana.',
            photo: '/images/close-grip-bench-press.jpg',
            commonErrors: [
              'Non allineare bene le mani con le spalle',
              'Lasciare cadere i pesi troppo velocemente',
              'Curvare la schiena durante il movimento'
            ],
            solutions: [
              'Posizionare le mani a distanza ridotta sulla barra, mantenendo i gomiti stretti',
              'Controllare la discesa dei pesi e spingere con potenza',
              'Tenere la schiena aderente alla panca e il core attivato'
            ]
          },
          {
            name: 'Barbell Curl',
            link: '/esercizi/barbell-curl',
            description: 'Esercizio per i bicipiti, eseguito con bilanciere.',
            photo: '/images/barbell-curl.jpg',
            commonErrors: [
              'Flettere la schiena per sollevare il peso',
              'Non controllare la fase negativa del movimento',
              'Usare un carico troppo elevato'
            ],
            solutions: [
              'Mantenere la schiena dritta e concentrarsi sulla contrazione del bicipite',
              'Controllare la discesa e non permettere al peso di cadere',
              'Scegliere un carico che permetta una buona esecuzione'
            ]
          },
          {
            name: 'Tricep Pushdown',
            link: '/esercizi/tricep-pushdown',
            description: 'Esercizio con cavo per isolare i tricipiti.',
            photo: '/images/tricep-pushdown.jpg',
            commonErrors: [
              'Non mantenere i gomiti fermi',
              'Usare un carico troppo elevato che impedisce il controllo',
              'Flettere troppo i polsi durante l’esercizio'
            ],
            solutions: [
              'Mantenere i gomiti vicino al corpo e fermi durante il movimento',
              'Usare un carico adeguato per eseguire correttamente l’esercizio',
              'Eseguire il movimento lentamente, mantenendo il controllo del cavo'
            ]
          },
          {
            name: 'Concentration Curl',
            link: '/esercizi/concentration-curl',
            description: 'Esercizio per isolare i bicipiti, eseguito con manubrio.',
            photo: '/images/concentration-curl.jpg',
            commonErrors: [
              'Mosse rapide o slancio nel movimento',
              'Non mantenere una postura corretta',
              'Non controllare il peso nella fase negativa'
            ],
            solutions: [
              'Eseguire il movimento lentamente e senza slancio',
              'Mantenere una postura stabile e una presa salda',
              'Controllare la discesa e concentrarsi sulla contrazione del bicipite'
            ]
          },
          {
            name: 'Cable Bicep Curl',
            link: '/esercizi/cable-bicep-curl',
            description: 'Curl eseguito con cavo, per migliorare la resistenza continua sul bicipite.',
            photo: '/images/cable-bicep-curl.jpg',
            commonErrors: [
              'Inarcare la schiena durante il movimento',
              'Usare slancio per sollevare il peso',
              'Flettere troppo i polsi'
            ],
            solutions: [
              'Mantenere la schiena dritta e il corpo fermo',
              'Sollevare il peso con un movimento controllato',
              'Mantenere i polsi in posizione neutra durante l’esercizio'
            ]
          },
          {
            name: 'Zottman Curl',
            link: '/esercizi/zottman-curl',
            description: 'Esercizio che combina il bicep curl e il reverse curl per allenare bicipiti e avambracci.',
            photo: '/images/zottman-curl.jpg',
            commonErrors: [
              'Usare slancio per eseguire l’esercizio',
              'Non ruotare completamente il polso',
              'Non eseguire correttamente la fase di discesa'
            ],
            solutions: [
              'Eseguire l’esercizio lentamente e senza slancio',
              'Ruotare completamente i polsi durante la fase di sollevamento',
              'Controllare la fase di discesa per evitare movimenti rapidi'
            ]
          }
        ]
      },
      {
        category: 'Schiena',
        icon: <Target className="text-green-600" />,
        exercises: [
          {
            name: 'Lat Pulldown',
            link: '/esercizi/lat-pulldown',
            description: 'Esercizio che coinvolge il grande dorsale e altri muscoli della schiena, ideale per migliorare la larghezza della schiena.',
            photo: '/images/lat-pulldown.jpg',
            commonErrors: [
              'Usare slancio per abbassare la barra',
              'Tirare la barra dietro il collo',
              'Non contrarre completamente i dorsali'
            ],
            solutions: [
              'Eseguire il movimento in modo controllato',
              'Portare la barra al petto anziché dietro il collo',
              'Concentrarsi sulla contrazione dei dorsali alla fine del movimento'
            ]
          },
          {
            name: 'Pull-Up',
            link: '/esercizi/pull-up',
            description: 'Esercizio a corpo libero per rafforzare il grande dorsale, il bicipite e altri muscoli stabilizzatori.',
            photo: '/images/pull-up.jpg',
            commonErrors: [
              'Usare slancio per tirarsi su',
              'Non estendere completamente le braccia nella fase di discesa',
              'Non attivare i muscoli della schiena'
            ],
            solutions: [
              'Eseguire movimenti lenti e controllati',
              'Estendere completamente le braccia tra una ripetizione e l’altra',
              'Concentrarsi sull’attivazione dei dorsali durante la trazione'
            ]
          },
          {
            name: 'Rematore con Bilanciere',
            link: '/esercizi/rematore-bilanciere',
            description: 'Esercizio multiarticolare per lavorare sui dorsali, il trapezio e la parte bassa della schiena.',
            photo: '/images/rematore-bilanciere.jpg',
            commonErrors: [
              'Curvare la schiena durante il movimento',
              'Usare troppo peso, compromettendo la tecnica',
              'Non tirare il bilanciere fino al petto'
            ],
            solutions: [
              'Mantenere la schiena neutra e il core attivo',
              'Utilizzare un carico adeguato',
              'Tirare il bilanciere fino al petto con un movimento controllato'
            ]
          },
          {
            name: 'T-Bar Row',
            link: '/esercizi/t-bar-row',
            description: 'Esercizio mirato per aumentare lo spessore della schiena, coinvolgendo dorsali, trapezio e romboidi.',
            photo: '/images/t-bar-row.jpg',
            commonErrors: [
              'Usare slancio per sollevare il carico',
              'Non mantenere la schiena piatta',
              'Limitare il range di movimento'
            ],
            solutions: [
              'Eseguire il movimento con controllo',
              'Tenere la schiena neutra durante tutto l’esercizio',
              'Lavorare su un range di movimento completo'
            ]
          },
          {
            name: 'Deadlift',
            link: '/esercizi/deadlift',
            description: 'Esercizio fondamentale per sviluppare forza e muscoli in tutta la catena posteriore, inclusa la schiena.',
            photo: '/images/deadlift.jpg',
            commonErrors: [
              'Curvare la schiena durante il sollevamento',
              'Sollecitare troppo le braccia anziché la schiena',
              'Non portare il bilanciere vicino al corpo'
            ],
            solutions: [
              'Mantenere la schiena neutra e il core contratto',
              'Usare la schiena e le gambe per sollevare il peso',
              'Far scorrere il bilanciere lungo le gambe durante il movimento'
            ]
          },
          {
            name: 'Seated Cable Row',
            link: '/esercizi/seated-cable-row',
            description: 'Esercizio per lo spessore della schiena che coinvolge dorsali, trapezio e romboidi.',
            photo: '/images/seated-cable-row.jpg',
            commonErrors: [
              'Usare troppo peso, compromettendo la tecnica',
              'Non mantenere la schiena dritta',
              'Non completare la contrazione della schiena'
            ],
            solutions: [
              'Usare un peso adeguato per eseguire il movimento correttamente',
              'Tenere la schiena dritta e il core attivato',
              'Contrarre completamente i muscoli della schiena alla fine del movimento'
            ]
          },
          {
            name: 'Face Pull',
            link: '/esercizi/face-pull',
            description: 'Esercizio per rafforzare i muscoli della parte superiore della schiena, ideale per migliorare la postura.',
            photo: '/images/face-pull.jpg',
            commonErrors: [
              'Usare troppo peso, sacrificando la forma',
              'Non mantenere il gomito all’altezza corretta',
              'Tirare con le braccia anziché con i muscoli della schiena'
            ],
            solutions: [
              'Utilizzare un peso moderato per un movimento controllato',
              'Tenere i gomiti all’altezza delle spalle durante il movimento',
              'Concentrarsi sull’attivazione dei romboidi e del trapezio'
            ]
          },
          {
            name: 'Hyperextension',
            link: '/esercizi/hyperextension',
            description: 'Esercizio per rafforzare la parte bassa della schiena e i glutei.',
            photo: '/images/hyperextension.jpg',
            commonErrors: [
              'Curvare la schiena oltre il range naturale',
              'Non controllare il movimento',
              'Usare slancio per completare l’esercizio'
            ],
            solutions: [
              'Mantenere la schiena neutra durante tutto l’esercizio',
              'Eseguire il movimento lentamente e con controllo',
              'Limitare il range di movimento per evitare eccessivi sforzi'
            ]
          },
          {
            name: 'Pullover con Manubrio',
            link: '/esercizi/pullover-manubrio',
            description: 'Esercizio che coinvolge dorsali e pettorali, utile anche per migliorare la mobilità delle spalle.',
            photo: '/images/pullover-manubrio.jpg',
            commonErrors: [
              'Usare troppo peso, sacrificando la forma',
              'Non mantenere il controllo nella fase di discesa',
              'Non attivare correttamente i dorsali'
            ],
            solutions: [
              'Utilizzare un peso adeguato per un’esecuzione controllata',
              'Mantenere il movimento lento e fluido',
              'Concentrarsi sull’attivazione dei dorsali durante l’esercizio'
            ]
          },
          {
            name: 'Reverse Fly',
            link: '/esercizi/reverse-fly',
            description: 'Esercizio per i muscoli della parte superiore della schiena, utile per correggere la postura e prevenire infortuni.',
            photo: '/images/reverse-fly.jpg',
            commonErrors: [
              'Usare troppo peso e perdere il controllo',
              'Non mantenere la schiena dritta',
              'Eseguire un range di movimento troppo limitato'
            ],
            solutions: [
              'Usare un peso moderato e controllato',
              'Tenere la schiena neutra e il core attivato',
              'Eseguire un range di movimento completo per massimizzare il lavoro sui muscoli'
            ]
          }
        ]
      },
      {
        category: 'Gambe',
        icon: <Footprints className="text-red-600" />,
        exercises: [
          { 
            name: 'Squat con Bilanciere', 
            link: '/esercizi/squat-bilanciere',
            description: 'Esercizio fondamentale per allenare i quadricipiti, i glutei e i muscoli posteriori della coscia, coinvolgendo anche il core per la stabilizzazione.',
            photo: '/images/squat-bilanciere.jpg',
            commonErrors: [
              'Non mantenere la schiena dritta',
              'Superare le ginocchia con le punte dei piedi',
              'Sollevare i talloni durante l’esecuzione'
            ],
            solutions: [
              'Mantenere una postura eretta con il core contratto',
              'Spingere indietro i fianchi durante il movimento',
              'Poggiare sempre il peso sui talloni'
            ]
          },
          {
            name: 'Affondi', 
            link: '/esercizi/affondi',
            description: 'Esercizio per gambe e glutei che coinvolge il quadricipite e i muscoli posteriori della coscia in modo isolato.',
            photo: '/images/affondi.jpg',
            commonErrors: [
              'Perdere l’equilibrio durante l’affondo',
              'Non abbassarsi abbastanza',
              'Ginocchio anteriore che supera la punta del piede'
            ],
            solutions: [
              'Mantenere il tronco dritto e il core contratto',
              'Scendere finché la coscia è parallela al pavimento',
              'Assicurarsi che il ginocchio non superi la punta del piede'
            ]
          },
          {
            name: 'Leg Press', 
            link: '/esercizi/leg-press',
            description: 'Esercizio di isolamento per allenare i quadricipiti e i glutei, con un carico facilmente regolabile.',
            photo: '/images/leg-press.jpg',
            commonErrors: [
              'Non mantenere la schiena aderente al supporto',
              'Bloccare completamente le ginocchia alla fine del movimento',
              'Usare troppo peso'
            ],
            solutions: [
              'Tenere la schiena completamente aderente al supporto',
              'Evitare di bloccare le ginocchia per proteggere le articolazioni',
              'Utilizzare un carico gestibile'
            ]
          },
          {
            name: 'Stacchi Rumeni',
            link: '/esercizi/stacchi-rumeni',
            description: 'Esercizio per rafforzare i muscoli posteriori della coscia, i glutei e la parte bassa della schiena.',
            photo: '/images/stacchi-rumeni.jpg',
            commonErrors: [
              'Curvare la schiena durante il movimento',
              'Portare il bilanciere troppo lontano dalle gambe',
              'Non estendere completamente i fianchi'
            ],
            solutions: [
              'Mantenere la schiena neutra e il core attivato',
              'Far scivolare il bilanciere vicino alle gambe',
              'Estendere completamente i fianchi alla fine del movimento'
            ]
          },
          {
            name: 'Pistol Squat',
            link: '/esercizi/pistol-squat',
            description: 'Esercizio avanzato a corpo libero per sviluppare forza e equilibrio nelle gambe.',
            photo: '/images/pistol-squat.jpg',
            commonErrors: [
              'Perdere l’equilibrio durante il movimento',
              'Non scendere abbastanza',
              'Curvare la schiena per compensare'
            ],
            solutions: [
              'Esercitarsi con il supporto di una parete o una fascia elastica',
              'Lavorare sulla mobilità per aumentare la profondità',
              'Mantenere il busto eretto durante tutto il movimento'
            ]
          },
          {
            name: 'Hip Thrust',
            link: '/esercizi/hip-thrust',
            description: 'Esercizio specifico per i glutei, che permette una forte contrazione del muscolo.',
            photo: '/images/hip-thrust.jpg',
            commonErrors: [
              'Non mantenere la schiena dritta durante il movimento',
              'Usare un carico troppo pesante',
              'Non raggiungere una piena estensione dell’anca'
            ],
            solutions: [
              'Posizionare correttamente la schiena su una panca stabile',
              'Utilizzare un carico adeguato per un movimento controllato',
              'Assicurarsi di raggiungere la massima contrazione dei glutei'
            ]
          },
          {
            name: 'Calf Raise',
            link: '/esercizi/calf-raise',
            description: 'Esercizio per allenare i muscoli del polpaccio, adatto a tutti i livelli.',
            photo: '/images/calf-raise.jpg',
            commonErrors: [
              'Non controllare il movimento',
              'Usare un range of motion limitato',
              'Trascurare la fase di discesa'
            ],
            solutions: [
              'Eseguire il movimento lentamente sia in salita che in discesa',
              'Assicurarsi di lavorare su tutto il range di movimento',
              'Evitare di rimbalzare durante il movimento'
            ]
          },
          {
            name: 'Leg Curl',
            link: '/esercizi/leg-curl',
            description: 'Esercizio isolato per allenare i muscoli posteriori della coscia.',
            photo: '/images/leg-curl.jpg',
            commonErrors: [
              'Sollevare il bacino dal supporto',
              'Non controllare il movimento durante il ritorno',
              'Usare troppo peso'
            ],
            solutions: [
              'Mantenere il bacino aderente al supporto',
              'Eseguire il movimento lentamente e controllato',
              'Utilizzare un peso adeguato alla propria forza'
            ]
          },
          {
            name: 'Bulgarian Split Squat',
            link: '/esercizi/bulgarian-split-squat',
            description: 'Esercizio per allenare gambe e glutei, con un’attenzione particolare all’equilibrio.',
            photo: '/images/bulgarian-split-squat.jpg',
            commonErrors: [
              'Perdere la stabilità durante il movimento',
              'Non scendere abbastanza con il ginocchio posteriore',
              'Spingere con il piede posteriore invece che con quello anteriore'
            ],
            solutions: [
              'Concentrarsi sulla stabilità mantenendo il core contratto',
              'Scendere fino a sfiorare il pavimento con il ginocchio posteriore',
              'Spingere principalmente con la gamba anteriore'
            ]
          },
          {
            name: 'Good Morning',
            link: '/esercizi/good-morning',
            description: 'Esercizio che rinforza i muscoli posteriori della coscia, i glutei e la parte bassa della schiena.',
            photo: '/images/good-morning.jpg',
            commonErrors: [
              'Curvare la schiena durante il movimento',
              'Non piegare le ginocchia a sufficienza',
              'Usare un carico eccessivo'
            ],
            solutions: [
              'Mantenere la schiena neutra e il core attivo',
              'Flettere leggermente le ginocchia durante l’esecuzione',
              'Utilizzare un carico adatto alla propria forza'
            ]
          }
        ]
      },
      {
        category: 'Spalle',
        icon: <Scaling className="text-yellow-600" />,
        exercises: [
          {
            name: 'Shoulder Press',
            link: '/esercizi/shoulder-press',
            description: 'Esercizio per rafforzare i deltoidi e migliorare la forza delle spalle.',
            photo: '/images/shoulder-press.jpg',
            commonErrors: [
              'Inarcare la schiena durante il movimento',
              'Non portare i pesi completamente sopra la testa',
              'Usare un carico eccessivo compromettendo la tecnica'
            ],
            solutions: [
              'Tenere la schiena dritta e i piedi ben piantati',
              'Spingere i pesi direttamente sopra la testa',
              'Utilizzare un carico adeguato per eseguire il movimento correttamente'
            ]
          },
          {
            name: 'Lateral Raise',
            link: '/esercizi/lateral-raise',
            description: 'Esercizio per isolare i deltoidi laterali e ottenere una forma delle spalle più tonde.',
            photo: '/images/lateral-raise.jpg',
            commonErrors: [
              'Usare lo slancio per sollevare i pesi',
              'Alzare le spalle durante il movimento',
              'Non controllare la discesa dei pesi'
            ],
            solutions: [
              'Eseguire il movimento lentamente e con controllo',
              'Tenere le spalle basse e rilassate',
              'Usare un carico leggero per mantenere una buona tecnica'
            ]
          },
          {
            name: 'Front Raise',
            link: '/esercizi/front-raise',
            description: 'Esercizio per rafforzare i deltoidi anteriori e migliorare la postura.',
            photo: '/images/front-raise.jpg',
            commonErrors: [
              'Sollevare i pesi troppo in alto',
              'Usare lo slancio del corpo per aiutarsi',
              'Non mantenere il core contratto'
            ],
            solutions: [
              'Sollevare i pesi fino all’altezza delle spalle',
              'Eseguire movimenti lenti e controllati',
              'Contrarre il core per stabilizzare il corpo'
            ]
          },
          {
            name: 'Arnold Press',
            link: '/esercizi/arnold-press',
            description: 'Variante del shoulder press che lavora su tutti i deltoidi e migliora la mobilità delle spalle.',
            photo: '/images/arnold-press.jpg',
            commonErrors: [
              'Inarcare la schiena durante il movimento',
              'Non eseguire una rotazione completa',
              'Usare un carico eccessivo'
            ],
            solutions: [
              'Tenere la schiena dritta e il core contratto',
              'Eseguire una rotazione completa controllata',
              'Utilizzare un peso adeguato per mantenere una buona tecnica'
            ]
          },
          {
            name: 'Face Pull',
            link: '/esercizi/face-pull',
            description: 'Esercizio per rafforzare i deltoidi posteriori e i muscoli della cuffia dei rotatori.',
            photo: '/images/face-pull.jpg',
            commonErrors: [
              'Usare un carico eccessivo che compromette la tecnica',
              'Non tirare il cavo verso il viso',
              'Curvare la schiena durante il movimento'
            ],
            solutions: [
              'Usare un carico moderato per mantenere una buona tecnica',
              'Tirare il cavo fino all’altezza del viso, mantenendo i gomiti alti',
              'Tenere la schiena dritta e il core contratto'
            ]
          },
          {
            name: 'Overhead Dumbbell Press',
            link: '/esercizi/overhead-dumbbell-press',
            description: 'Esercizio classico per rafforzare i deltoidi e migliorare la forza generale delle spalle.',
            photo: '/images/overhead-dumbbell-press.jpg',
            commonErrors: [
              'Inarcare la schiena durante il sollevamento',
              'Non portare i pesi completamente sopra la testa',
              'Usare un peso troppo elevato, compromettendo la stabilità'
            ],
            solutions: [
              'Tenere la schiena dritta e il core attivato',
              'Spingere i pesi direttamente sopra la testa',
              'Utilizzare pesi adeguati per mantenere una buona tecnica'
            ]
          },
          {
            name: 'Upright Row',
            link: '/esercizi/upright-row',
            description: 'Esercizio per rafforzare i deltoidi laterali e migliorare la forza della parte superiore del corpo.',
            photo: '/images/upright-row.jpg',
            commonErrors: [
              'Portare i gomiti troppo in alto',
              'Curvare la schiena durante il movimento',
              'Usare un carico eccessivo'
            ],
            solutions: [
              'Mantenere i gomiti allineati con le spalle',
              'Tenere la schiena dritta e il core contratto',
              'Utilizzare un carico adeguato per eseguire correttamente l’esercizio'
            ]
          },
          {
            name: 'Reverse Fly',
            link: '/esercizi/reverse-fly',
            description: 'Esercizio per rafforzare i deltoidi posteriori e migliorare la postura.',
            photo: '/images/reverse-fly.jpg',
            commonErrors: [
              'Usare slancio per sollevare i pesi',
              'Non contrarre i muscoli della schiena',
              'Curvare la schiena durante il movimento'
            ],
            solutions: [
              'Eseguire movimenti lenti e controllati',
              'Concentrarsi sulla contrazione dei muscoli della schiena',
              'Tenere la schiena dritta e il core attivato'
            ]
          },
          {
            name: 'Dumbbell Shrug',
            link: '/esercizi/dumbbell-shrug',
            description: 'Esercizio per rafforzare il trapezio e migliorare la forza della parte superiore delle spalle.',
            photo: '/images/dumbbell-shrug.jpg',
            commonErrors: [
              'Usare un carico eccessivo',
              'Ruotare le spalle durante il movimento',
              'Non eseguire il movimento completo'
            ],
            solutions: [
              'Utilizzare un carico moderato per eseguire correttamente l’esercizio',
              'Sollevare le spalle direttamente verso l’alto',
              'Mantenere il movimento lento e controllato'
            ]
          }
        ]
      },
      {
        category: 'Core',
        icon: <Flame className="text-cyan-600" />,
        exercises: [
            {
            name: 'Plank',
            link: '/esercizi/plank',
            description: 'Esercizio isometrico per rafforzare il core, migliorare la stabilità e la postura.',
            photo: '/images/plank.jpg',
            commonErrors: [
                'Inarcare la schiena durante l’esecuzione',
                'Non mantenere il bacino allineato',
                'Trattenere il respiro'
            ],
            solutions: [
                'Tenere la schiena dritta e il core contratto',
                'Allineare bacino e spalle',
                'Respirare regolarmente e mantenere la posizione stabile'
            ]
            },
            {
            name: 'Crunch',
            link: '/esercizi/crunch',
            description: 'Esercizio classico per lavorare sui muscoli addominali superiori.',
            photo: '/images/crunch.jpg',
            commonErrors: [
                'Tirare il collo con le mani',
                'Usare slancio per completare il movimento',
                'Non controllare il ritorno alla posizione iniziale'
            ],
            solutions: [
                'Tenere le mani dietro la testa senza tirare il collo',
                'Eseguire movimenti controllati',
                'Contrarre gli addominali per tutto il movimento'
            ]
            },
            {
            name: 'Russian Twist',
            link: '/esercizi/russian-twist',
            description: 'Esercizio per lavorare sugli obliqui e migliorare la rotazione del core.',
            photo: '/images/russian-twist.jpg',
            commonErrors: [
                'Muovere solo le braccia senza coinvolgere il core',
                'Non mantenere la schiena dritta',
                'Usare troppo peso, compromettendo la tecnica'
            ],
            solutions: [
                'Ruotare il busto coinvolgendo il core',
                'Tenere la schiena neutra',
                'Usare un carico adeguato per un movimento corretto'
            ]
            },
            {
            name: 'Mountain Climber',
            link: '/esercizi/mountain-climber',
            description: 'Esercizio dinamico per allenare il core e migliorare la resistenza cardiovascolare.',
            photo: '/images/mountain-climber.jpg',
            commonErrors: [
                'Alzare troppo il bacino durante il movimento',
                'Non mantenere una velocità controllata',
                'Non coinvolgere il core'
            ],
            solutions: [
                'Tenere il bacino allineato con la schiena',
                'Mantenere un ritmo costante e controllato',
                'Contrarre il core per stabilizzare il corpo'
            ]
            },
            {
            name: 'Leg Raise',
            link: '/esercizi/leg-raise',
            description: 'Esercizio per rafforzare gli addominali inferiori e migliorare la stabilità del core.',
            photo: '/images/leg-raise.jpg',
            commonErrors: [
                'Curvare la schiena durante la fase di discesa',
                'Non controllare il ritorno alla posizione iniziale',
                'Utilizzare lo slancio anziché i muscoli addominali'
            ],
            solutions: [
                'Premere la parte bassa della schiena contro il pavimento',
                'Eseguire movimenti lenti e controllati',
                'Concentrarsi sull’attivazione degli addominali inferiori'
            ]
            },
            {
            name: 'Bicycle Crunch',
            link: '/esercizi/bicycle-crunch',
            description: 'Esercizio per lavorare sugli addominali superiori e sugli obliqui in modo dinamico.',
            photo: '/images/bicycle-crunch.jpg',
            commonErrors: [
                'Tirare il collo con le mani',
                'Non eseguire una rotazione completa del busto',
                'Usare slancio anziché controllare il movimento'
            ],
            solutions: [
                'Tenere le mani leggere dietro la testa senza tirare il collo',
                'Ruotare completamente il busto per attivare gli obliqui',
                'Eseguire il movimento lentamente e con controllo'
            ]
            },
            {
            name: 'Side Plank',
            link: '/esercizi/side-plank',
            description: 'Esercizio isometrico per rafforzare gli obliqui e migliorare la stabilità laterale.',
            photo: '/images/side-plank.jpg',
            commonErrors: [
                'Inclinare il bacino verso il basso',
                'Non allineare testa, spalle e piedi',
                'Trattenere il respiro'
            ],
            solutions: [
                'Tenere il bacino sollevato e il corpo in linea retta',
                'Allineare correttamente testa, spalle e piedi',
                'Respirare regolarmente e mantenere la posizione'
            ]
            },
            {
            name: 'Hanging Leg Raise',
            link: '/esercizi/hanging-leg-raise',
            description: 'Esercizio avanzato per gli addominali inferiori e il core, eseguito sospesi a una barra.',
            photo: '/images/hanging-leg-raise.jpg',
            commonErrors: [
                'Usare slancio per sollevare le gambe',
                'Curvare la schiena durante il movimento',
                'Non controllare il ritorno alla posizione iniziale'
            ],
            solutions: [
                'Eseguire il movimento lentamente e con controllo',
                'Tenere la schiena neutra per tutto l’esercizio',
                'Concentrarsi sull’attivazione degli addominali inferiori'
            ]
            },
            {
            name: 'Ab Wheel Rollout',
            link: '/esercizi/ab-wheel-rollout',
            description: 'Esercizio avanzato per il core, che coinvolge anche spalle e dorsali.',
            photo: '/images/ab-wheel-rollout.jpg',
            commonErrors: [
                'Inarcare la schiena durante il movimento',
                'Non controllare la fase di ritorno',
                'Non mantenere il core contratto'
            ],
            solutions: [
                'Tenere la schiena dritta e il core attivato',
                'Eseguire il movimento lentamente e con controllo',
                'Limitare il range di movimento per evitare infortuni'
            ]
            },
            {
            name: 'Flutter Kick',
            link: '/esercizi/flutter-kick',
            description: 'Esercizio dinamico per allenare gli addominali inferiori e migliorare la resistenza del core.',
            photo: '/images/flutter-kick.jpg',
            commonErrors: [
                'Curvare la schiena durante il movimento',
                'Non controllare il ritmo delle gambe',
                'Non attivare correttamente il core'
            ],
            solutions: [
                'Premere la parte bassa della schiena contro il pavimento',
                'Mantenere un ritmo costante e controllato',
                'Concentrarsi sull’attivazione degli addominali'
            ]
          }
        ]
      }
    ];
export default function Manual() {
    const [openCategory, setOpenCategory] = useState<string | null>(null);
    const [selectedExercise, setSelectedExercise] = useState<{
      name: string;
      link: string;
      description: string;
      photo: string;
      commonErrors: string[];
      solutions: string[];
    } | null>(null);
  
    const toggleCategory = (category: string) => {
      setOpenCategory(openCategory === category ? null : category);
    };
  
    const handleExerciseDetails = (exercise: {
      name: string;
      link: string;
      description: string;
      photo: string;
      commonErrors: string[];
      solutions: string[];
    }) => {
      setSelectedExercise(exercise);
    };
  
    const closeExerciseDetails = () => {
      setSelectedExercise(null);
    };
  
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 mb-20 relative"
        
      >
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-5xl font-extrabold text-center text-white mb-12 tracking-tight"
          >
            Manuale
          </motion.h1>
  
          <div className="space-y-6">
            {exerciseCategories.map((category) => (
              <motion.div 
                key={category.category}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden "
              >
                <motion.div 
                  onClick={() => toggleCategory(category.category)}
                  className="flex items-center justify-between p-6 cursor-pointer hover:bg-neutral-800 transition-colors "
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-4 bg-neutral-800/50 p-4 rounded-3xl">
                    {category.icon}
                    <h2 className="text-2xl font-semibold text-white ">
                      {category.category}
                    </h2>
                  </div>
                  {openCategory === category.category ? (
                    <ChevronUp className="text-white" />
                  ) : (
                    <ChevronDown className="text-white" />
                  )}
                </motion.div>
  
                <AnimatePresence>
                  {openCategory === category.category && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ 
                        opacity: 1, 
                        height: 'auto',
                        transition: { duration: 0.3 }
                      }}
                      exit={{ 
                        opacity: 0, 
                        height: 0,
                        transition: { duration: 0.2 }
                      }}
                      className="bg-neutral-800/50 p-6 "
                    >
                      <ul className="space-y-4 ">
                        {category.exercises.map((exercise) => (
                          <motion.li 
                            key={exercise.name}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="flex justify-between items-center text-white hover:bg-neutral-800 transition-colors  p-4 rounded-3xl "
                            onClick={() => handleExerciseDetails(exercise)}
                          >
                            <span className="text-lg font-medium">
                              {exercise.name}
                            </span>
                            <button 
                              onClick={() => handleExerciseDetails(exercise)}
                              className="
                                bg-blue-600 text-white 
                                px-4 py-2 rounded-full 
                                hover:bg-blue-700 
                                transition-colors 
                                flex items-center 
                                space-x-2 
                                text-sm 
                                font-semibold
                                transform hover:scale-105
                              "
                            >
                              Dettagli
                            </button>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
  
          {/* Exercise Details Modal */}
          <AnimatePresence>
            {selectedExercise && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4"
                
              >
                <motion.div
                  initial={{ scale: 0.9, y: 50 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 50 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="bg-neutral-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-neutral-800"
                >
                  <div className="relative">
                    {/* Close Button */}
                    <button 
                      onClick={closeExerciseDetails}
                      
                      className="absolute top-4 right-4 z-10 bg-white text-black rounded-full p-2  transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
  
                    {/* Exercise Image */}
                    <div className="relative w-full h-64 overflow-hidden rounded-t-2xl">
                      <Image 
                        src={selectedExercise.photo || '/placeholder-exercise.jpg'} 
                        alt={selectedExercise.name}
                        className="w-full h-full object-cover object-center"
                        layout="fill"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <h2 className="absolute bottom-4 left-4 text-3xl font-bold text-white">
                        {selectedExercise.name}
                      </h2>
                    </div>
  
                    {/* Exercise Details */}
                    <div className="p-6 space-y-6">
                      {/* Description */}
                      <motion.section
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <h3 className="text-2xl font-semibold text-white mb-3">
                          Descrizione
                        </h3>
                        <p className="text-neutral-300 leading-relaxed">
                          {selectedExercise.description}
                        </p>
                      </motion.section>
  
                      {/* Common Errors */}
                      <motion.section
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className='mb-6 bg-neutral-800 p-4 rounded-lg'
                      >
                        <h3 className="text-2xl font-semibold text-red-600 mb-3">
                          Errori Comuni da Evitare
                        </h3>
                        <ul className="space-y-2">
                          {selectedExercise.commonErrors.map((error: string, index: number) => (
                            <motion.li 
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.4 + index * 0.1 }}
                              className="text-white flex items-center space-x-2"
                            >
                              <span className="text-red-700">•</span>
                              <span>{error}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.section>
  
                      {/* Solutions */}
                      <motion.section
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className='mb-6 bg-neutral-800 p-4 rounded-lg'
                      >
                        <h3 className="text-2xl font-semibold text-green-600 mb-3">
                          Soluzioni
                        </h3>
                        <ul className="space-y-2">
                          {selectedExercise.solutions.map((solution: string, index: number) => (
                            <motion.li 
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5 + index * 0.1 }}
                              className="text-white flex items-center space-x-2"
                            >
                              <span className="text-white">✓</span>
                              <span>{solution}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.section>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  }