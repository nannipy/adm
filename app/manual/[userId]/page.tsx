'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Dumbbell, 
  ChevronDown, 
  ChevronUp, 
  BicepsFlexed,
  Flame,
  X
} from 'lucide-react';
import Image from 'next/image';

// Expanded exercise categories with more exercises
const exerciseCategories = [
  {
    category: 'Petto',  
    icon: <Dumbbell className="text-blue-600" />,
    exercises: [
      {
        name: 'Panca Piana con Bilanciere',
        link: '/esercizi/panca-piana-bilanciere',
        description: 'Esercizio multiarticolare che costruisce forza e massa muscolare nel petto, coinvolgendo anche i tricipiti e i deltoidi anteriori.',
        photo: '/images/panca-piana-bilanciere.jpg',
        commonErrors: [
          'Sollevare i glutei dalla panca',
          'Spingere in modo asimmetrico',
          'Usare un range di movimento incompleto',
        ],
        solutions: [
          'Mantenere i glutei sempre aderenti alla panca',
          'Spingere con entrambe le braccia in modo simmetrico',
          'Eseguire il movimento su tutto il range, toccando il petto con il bilanciere',
        ],
      },
      {
        name: 'Panca Inclinata con Bilanciere',
        link: '/esercizi/panca-inclinata-bilanciere',
        description: 'Concentra il lavoro sulla parte alta del petto, coinvolgendo in modo secondario i deltoidi anteriori.',
        photo: '/images/panca-inclinata-bilanciere.jpg',
        commonErrors: [
          'Scendere troppo velocemente',
          'Inclinare la schiena eccessivamente',
          'Non abbassare completamente il bilanciere',
        ],
        solutions: [
          'Controllare la fase eccentrica del movimento',
          'Mantenere una posizione stabile e neutrale della schiena',
          'Abbassare il bilanciere fino a sfiorare il petto',
        ],
      },
      {
        name: 'Panca Decline con Bilanciere',
        link: '/esercizi/panca-decline-bilanciere',
        description: 'Favorisce lo sviluppo della parte inferiore del petto, riducendo lo stress sulle spalle.',
        photo: '/images/panca-decline-bilanciere.jpg',
        commonErrors: [
          'Sollevare il peso con uno slancio',
          'Non completare il movimento',
        ],
        solutions: [
          'Usare un peso controllato per eseguire il movimento in modo fluido',
          'Spingere fino a completa estensione del gomito',
        ],
      },
      {
        name: 'Panca Piana con Manubri',
        link: '/esercizi/panca-piana-manubri',
        description: 'Permette un range di movimento maggiore rispetto al bilanciere, attivando maggiormente il petto.',
        photo: '/images/panca-piana-manubri.jpg',
        commonErrors: [
          'Movimento asimmetrico',
          'Caduta del controllo nei punti estremi del movimento',
        ],
        solutions: [
          'Spingere con entrambi i manubri in modo sincronizzato',
          'Evitare di estendere troppo le braccia in alto o di scendere oltre il limite articolare',
        ],
      },
      {
        name: 'Croci su Panca Inclinata con Manubri',
        link: '/esercizi/croci-panca-inclinata',
        description: 'Esercizio di isolamento per il petto alto, ideale per sviluppare la definizione muscolare.',
        photo: '/images/croci-panca-inclinata.jpg',
        commonErrors: [
          'Flettere troppo i gomiti',
          'Usare un peso troppo pesante',
          'Non controllare il movimento',
        ],
        solutions: [
          'Mantenere i gomiti leggermente piegati',
          'Usare un carico che consenta un’esecuzione corretta',
          'Eseguire il movimento lentamente e con controllo',
        ],
      },
      {
        name: 'Chest Dip alle Parallele',
        link: '/esercizi/dip-petto',
        description: 'Esercizio multiarticolare che colpisce il petto inferiore e i tricipiti.',
        photo: '/images/dip-petto.jpg',
        commonErrors: [
          'Non inclinare il busto in avanti',
          'Non scendere abbastanza',
          'Sovraccaricare senza controllo',
        ],
        solutions: [
          'Inclina il busto in avanti per concentrarti sul petto',
          'Scendi finché le spalle sono allineate ai gomiti',
          'Usa un carico che puoi gestire in sicurezza',
        ],
      },
      {
        name: 'Pec Deck (Butterfly)',
        link: '/esercizi/pec-deck',
        description: 'Macchinario che isola i pettorali, ottimo per stretching e contrazione muscolare.',
        photo: '/images/pec-deck.jpg',
        commonErrors: [
          'Eccessiva apertura delle braccia',
          'Movimento troppo rapido',
          'Postura scorretta',
        ],
        solutions: [
          'Regolare il sedile per un’adeguata apertura del petto',
          'Eseguire il movimento lentamente e con controllo',
          'Mantenere una postura stabile e le spalle abbassate',
        ],
      },
      {
        name: 'Pullover con Manubrio',
        link: '/esercizi/pullover-manubrio',
        description: 'Lavora sia il petto che i dorsali, ottimo per espandere la gabbia toracica.',
        photo: '/images/pullover-manubrio.jpg',
        commonErrors: [
          'Usare un peso eccessivo',
          'Non controllare la fase negativa',
        ],
        solutions: [
          'Usare un peso che consenta una corretta esecuzione',
          'Controllare il movimento durante la discesa',
        ],
      },
      {
        name: 'Croci ai Cavi',
        link: '/esercizi/croci-cavi',
        description: 'Esercizio che isola i pettorali con una tensione costante grazie ai cavi.',
        photo: '/images/croci-cavi.jpg',
        commonErrors: [
          'Usare un peso eccessivo',
          'Non completare l’arco del movimento',
        ],
        solutions: [
          'Scegliere un carico adatto al controllo',
          'Eseguire il movimento completamente, incrociando leggermente le mani davanti al petto',
        ],
      },
      {
        name: 'Spinte ai Cavi su Panca Inclinata',
        link: '/esercizi/spinte-cavi-inclinata',
        description: 'Concentra il lavoro sulla parte alta del petto con tensione costante.',
        photo: '/images/spinte-cavi-inclinata.jpg',
        commonErrors: [
          'Movimento non sincronizzato',
          'Eccessiva spinta delle spalle',
        ],
        solutions: [
          'Spingere entrambe le braccia in modo sincronizzato',
          'Mantenere il focus sul petto, senza coinvolgere troppo le spalle',
        ],
      },
    ],
  },
  {
    category: 'Bicipiti',
    icon: <BicepsFlexed className="text-purple-600" />,
    exercises: [
      {
        name: 'Curl con Bilanciere',
        link: '/esercizi/curl-bilanciere',
        description: 'Esercizio classico per lo sviluppo della massa e della forza dei bicipiti, che coinvolge l\'intero muscolo in un movimento completo.',
        photo: '/images/curl-bilanciere.jpg',
        commonErrors: [
          'Utilizzo di slancio del corpo',
          'Movimento non controllato',
          'Gomiti che si staccano dal busto',
          'Range di movimento incompleto'
        ],
        solutions: [
          'Mantenere il corpo fermo, isolando il movimento dei bicipiti',
          'Eseguire il movimento lentamente e con controllo',
          'Tenere i gomiti aderenti ai lati del corpo',
          'Eseguire il movimento su tutto il range, dalla completa estensione al massimo picco di contrazione'
        ],
      },
      {
        name: 'Curl con Manubri',
        link: '/esercizi/curl-manubri',
        description: 'Permette un movimento più naturale rispetto al bilanciere, con possibilità di ruotare i polsi e lavorare i bicipiti da angolazioni diverse.',
        photo: '/images/curl-manubri.jpg',
        commonErrors: [
          'Movimento asimmetrico',
          'Rotazione dei polsi non corretta',
          'Sollevamento dei gomiti',
          'Uso di un peso eccessivo'
        ],
        solutions: [
          'Eseguire il movimento in modo sincronizzato e controllato',
          'Ruotare leggermente i polsi durante il sollevamento per massima contrazione',
          'Mantenere i gomiti fermi vicino al corpo',
          'Scegliere un peso che consenta una corretta esecuzione tecnica'
        ],
      },
      {
        name: 'Curl con Cavi',
        link: '/esercizi/curl-cavi',
        description: 'Offre una tensione costante durante tutto il movimento, stimolando i bicipiti in modo diverso rispetto ai pesi liberi.',
        photo: '/images/curl-cavi.jpg',
        commonErrors: [
          'Movimento troppo veloce',
          'Non mantenere la tensione costante',
          'Utilizzare tutto il corpo per sollevare',
          'Posizione scorretta'
        ],
        solutions: [
          'Eseguire il movimento lentamente e controllato',
          'Mantenere sempre una leggera tensione sui cavi',
          'Isolare il movimento dei bicipiti, evitando movimento del corpo',
          'Posizionarsi correttamente rispetto alla macchina dei cavi'
        ],
      },
      {
        name: 'Curl Concentrato',
        link: '/esercizi/curl-concentrato',
        description: 'Esercizio di isolamento che permette di concentrarsi su un singolo braccio, ottimo per correggere squilibri muscolari.',
        photo: '/images/curl-concentrato.jpg',
        commonErrors: [
          'Movimento non controllato',
          'Gomito che si muove durante l\'esecuzione',
          'Non completare il range di movimento',
          'Posizione scorretta sulla panca'
        ],
        solutions: [
          'Eseguire il movimento lentamente e con precisione',
          'Mantenere il gomito fermo contro l\'interno coscia',
          'Portare il manubrio completamente su e giù',
          'Posizionarsi correttamente sulla panca, con il gomito ben appoggiato'
        ],
      },
      {
        name: 'Curl Hammer',
        link: '/esercizi/curl-hammer',
        description: 'Variante del curl che lavora principalmente il muscolo brachiale e la parte esterna del bicipite, migliorando lo sviluppo complessivo del braccio.',
        photo: '/images/curl-hammer.jpg',
        commonErrors: [
          'Movimento non controllato',
          'Oscillazione del corpo',
          'Non mantenere i polsi stabili',
          'Range di movimento incompleto'
        ],
        solutions: [
          'Controllare il movimento in fase di salita e discesa',
          'Mantenere il corpo fermo, isolando il movimento dei bicipiti',
          'Mantenere i polsi in posizione neutra durante tutto il movimento',
          'Eseguire il movimento su tutto il range, dalla completa estensione al massimo picco di contrazione'
        ],
      },
      {
        name: 'Curl con Bilanciere al Cavo Basso',
        link: '/esercizi/curl-bilanciere-cavo-basso',
        description: 'Variante che offre una resistenza costante e permette di lavorare i bicipiti da un angolo diverso rispetto ai curl tradizionali.',
        photo: '/images/curl-bilanciere-cavo-basso.jpg',
        commonErrors: [
          'Movimento troppo veloce',
          'Sollevamento dei gomiti',
          'Non mantenere la tensione',
          'Uso di un peso eccessivo'
        ],
        solutions: [
          'Eseguire il movimento lentamente e controllato',
          'Mantenere i gomiti fermi lungo i fianchi',
          'Mantenere una tensione costante durante tutto il movimento',
          'Scegliere un carico che consenta una corretta esecuzione tecnica'
        ],
      },
      {
        name: 'Curl su Panca Scott',
        link: '/esercizi/curl-panca-scott',
        description: 'Esercizio di isolamento che permette di lavorare i bicipiti con un supporto che impedisce movimenti compensatori.',
        photo: '/images/curl-panca-scott.jpg',
        commonErrors: [
          'Sollevare i gomiti dalla panca',
          'Non completare il range di movimento',
          'Movimento non controllato',
          'Uso di un peso eccessivo'
        ],
        solutions: [
          'Mantenere i gomiti ben appoggiati sulla panca',
          'Portare il bilanciere o il manubrio completamente su e giù',
          'Eseguire il movimento con controllo e precisione',
          'Scegliere un carico che permetta una corretta esecuzione tecnica'
        ],
      },
      {
        name: 'Curl Inverso',
        link: '/esercizi/curl-inverso',
        description: 'Esercizio che lavora prevalentemente l\'avambraccio e la parte esterna del bicipite, migliorando la forza e la definizione del braccio.',
        photo: '/images/curl-inverso.jpg',
        commonErrors: [
          'Movimento non controllato',
          'Utilizzo di slancio',
          'Non mantenere i polsi stabili',
          'Range di movimento incompleto'
        ],
        solutions: [
          'Eseguire il movimento lentamente e con precisione',
          'Isolare il movimento, evitando oscillazioni del corpo',
          'Mantenere i polsi stabili in posizione neutra',
          'Eseguire il movimento su tutto il range di movimento'
        ],
      },
      {
        name: 'Curl Preacher',
        link: '/esercizi/curl-preacher',
        description: 'Esercizio di isolamento che permette di lavorare i bicipiti con un supporto che impedisce compensazioni e movimenti scorretti.',
        photo: '/images/curl-preacher.jpg',
        commonErrors: [
          'Sollevare i gomiti dal supporto',
          'Movimento troppo veloce',
          'Non completare il range di movimento',
          'Uso di un peso eccessivo'
        ],
        solutions: [
          'Mantenere i gomiti ben appoggiati sul supporto',
          'Eseguire il movimento lentamente e controllato',
          'Portare il bilanciere o il manubrio completamente su e giù',
          'Scegliere un carico che consenta una corretta esecuzione tecnica'
        ],
      },
      {
        name: 'Curl con Elastico',
        link: '/esercizi/curl-elastico',
        description: 'Esercizio versatile che permette di allenare i bicipiti con una resistenza progressiva e adatta a diversi livelli di fitness.',
        photo: '/images/curl-elastico.jpg',
        commonErrors: [
          'Movimento non controllato',
          'Non mantenere la tensione dell\'elastico',
          'Range di movimento incompleto',
          'Posizione scorretta'
        ],
        solutions: [
          'Eseguire il movimento lentamente e con precisione',
          'Mantenere una tensione costante sull\'elastico',
          'Eseguire il movimento su tutto il range, dalla completa estensione al massimo picco di contrazione',
          'Posizionarsi correttamente per un movimento efficace'
        ],
      }
    ],
  },
      {
        category: 'Schiena',
        icon: <Dumbbell className="text-green-600" />,
        exercises: [
          {
            name: 'Stacco da Terra',
            link: '/esercizi/stacco-da-terra',
            description: 'Esercizio fondamentale per sviluppare forza e massa su tutta la catena posteriore, con focus sui lombari, dorsali e trapezio.',
            photo: '/images/stacco-da-terra.jpg',
            commonErrors: [
              'Incurvare la schiena',
              'Non attivare il core',
              'Alzare il peso con le braccia',
            ],
            solutions: [
              'Mantenere la schiena neutra durante tutto il movimento',
              'Contrarre gli addominali per stabilizzare il core',
              'Spingere con le gambe, non tirare con le braccia',
            ],
          },
          {
            name: 'Rematore con Bilanciere',
            link: '/esercizi/rematore-bilanciere',
            description: 'Esercizio multiarticolare che colpisce i dorsali, il trapezio e i romboidi, migliorando la densità della schiena.',
            photo: '/images/rematore-bilanciere.jpg',
            commonErrors: [
              'Incurvare la schiena',
              'Non portare il bilanciere verso l’addome',
              'Usare uno slancio eccessivo',
            ],
            solutions: [
              'Mantenere la schiena dritta e stabile',
              'Tirare il bilanciere verso l’ombelico',
              'Eseguire il movimento lentamente senza usare lo slancio',
            ],
          },
          {
            name: 'Pull-Up (Trazioni alla Sbarra)',
            link: '/esercizi/pull-up',
            description: 'Esercizio a corpo libero che sviluppa forza nei dorsali, bicipiti e romboidi.',
            photo: '/images/pull-up.jpg',
            commonErrors: [
              'Usare uno slancio per completare il movimento',
              'Non scendere completamente',
              'Non attivare le scapole',
            ],
            solutions: [
              'Eseguire il movimento in modo controllato',
              'Scendere completamente per un range di movimento completo',
              'Attivare le scapole prima di tirare',
            ],
          },
          {
            name: 'Lat Machine Avanti',
            link: '/esercizi/lat-machine-avanti',
            description: 'Esercizio guidato per isolare i dorsali e migliorare la larghezza della schiena.',
            photo: '/images/lat-machine-avanti.jpg',
            commonErrors: [
              'Non abbassare completamente la barra',
              'Usare un peso troppo elevato',
              'Tirare con le braccia anziché con i dorsali',
            ],
            solutions: [
              'Portare la barra fino al petto',
              'Utilizzare un carico che consenta una corretta esecuzione',
              'Concentrarsi sull’attivazione dei dorsali durante la tirata',
            ],
          },
          {
            name: 'Rematore con Manubrio',
            link: '/esercizi/rematore-manubrio',
            description: 'Esercizio unilaterale per lavorare i dorsali e migliorare la simmetria muscolare.',
            photo: '/images/rematore-manubrio.jpg',
            commonErrors: [
              'Incurvare la schiena',
              'Usare troppo slancio',
              'Non completare il range di movimento',
            ],
            solutions: [
              'Mantenere la schiena neutra',
              'Eseguire il movimento lentamente e con controllo',
              'Portare il manubrio fino al fianco',
            ],
          },
          {
            name: 'Pullover ai Cavi',
            link: '/esercizi/pullover-cavi',
            description: 'Isola i dorsali, con tensione costante grazie ai cavi.',
            photo: '/images/pullover-cavi.jpg',
            commonErrors: [
              'Usare il peso delle spalle',
              'Non mantenere i gomiti leggermente piegati',
            ],
            solutions: [
              'Concentrarsi sull’attivazione dei dorsali',
              'Mantenere i gomiti fissi e leggermente piegati durante tutto il movimento',
            ],
          },
          {
            name: 'Rematore T-Bar',
            link: '/esercizi/rematore-t-bar',
            description: 'Concentra il lavoro sulla parte centrale della schiena, coinvolgendo anche i bicipiti.',
            photo: '/images/rematore-t-bar.jpg',
            commonErrors: [
              'Usare un carico eccessivo',
              'Non controllare la fase negativa',
              'Eseguire un range di movimento incompleto',
            ],
            solutions: [
              'Usare un peso gestibile per mantenere una forma corretta',
              'Controllare il movimento nella fase di discesa',
              'Completare il range portando il peso vicino al petto',
            ],
          },
          {
            name: 'Shrug con Bilanciere',
            link: '/esercizi/shrug-bilanciere',
            description: 'Esercizio per il trapezio, utile per sviluppare la parte alta della schiena.',
            photo: '/images/shrug-bilanciere.jpg',
            commonErrors: [
              'Usare uno slancio con il corpo',
              'Non elevare le spalle completamente',
            ],
            solutions: [
              'Eseguire il movimento lentamente, senza slancio',
              'Alzare le spalle il più possibile',
            ],
          },
          {
            name: 'Iperestensioni Lombari',
            link: '/esercizi/iperestensioni-lombari',
            description: 'Concentrato sui lombari, migliora la forza della parte bassa della schiena.',
            photo: '/images/iperestensioni-lombari.jpg',
            commonErrors: [
              'Inarcare troppo la schiena',
              'Non contrarre i glutei durante il movimento',
            ],
            solutions: [
              'Mantenere la schiena neutra',
              'Contrarre i glutei per stabilizzare il movimento',
            ],
          },
          {
            name: 'Face Pull ai Cavi',
            link: '/esercizi/face-pull',
            description: 'Ottimo per migliorare la postura, lavorando i romboidi e il trapezio.',
            photo: '/images/face-pull.jpg',
            commonErrors: [
              'Usare un carico eccessivo',
              'Non portare le mani verso il viso',
            ],
            solutions: [
              'Scegliere un carico che consenta il controllo',
              'Eseguire il movimento tirando verso il viso con controllo',
            ],
          },
        ],
      },
      {
        category: 'Gambe',
        icon: <Dumbbell className="text-green-600" />,
        exercises: [
          {
            name: 'Squat con Bilanciere',
            link: '/esercizi/squat-bilanciere',
            description: 'Esercizio fondamentale per lo sviluppo complessivo della forza delle gambe, coinvolgendo quadricipiti, glutei, femorali e stabilizzatori core.',
            photo: '/images/squat-bilanciere.jpg',
            commonErrors: [
              'Cedimento delle ginocchia verso l\'interno',
              'Non raggiungere la profondità corretta',
              'Sollevare i talloni durante il movimento',
              'Inclinare eccessivamente il busto in avanti'
            ],
            solutions: [
              'Spingere le ginocchia verso l\'esterno durante il movimento',
              'Scendere fino a che i fianchi siano sotto il livello delle ginocchia',
              'Mantenere i piedi completamente a terra, distribuendo il peso',
              'Mantenere la schiena dritta e il busto più verticale possibile'
            ],
          },
          {
            name: 'Leg Press',
            link: '/esercizi/leg-press',
            description: 'Esercizio per lo sviluppo dei quadricipiti, glutei e femorali, con minore stress sulla colonna vertebrale rispetto agli squat.',
            photo: '/images/leg-press.jpg',
            commonErrors: [
              'Sollevare i glutei dalla seduta',
              'Estendere completamente le ginocchia',
              'Non controllare la fase negativa del movimento',
              'Posizionamento errato dei piedi'
            ],
            solutions: [
              'Mantenere la schiena completamente aderente alla seduta',
              'Fermarsi prima dell\'estensione completa per mantenere tensione muscolare',
              'Controllare lentamente la discesa del peso',
              'Posizionare i piedi alla larghezza delle spalle, centrati sulla pedana'
            ],
          },
          {
            name: 'Affondi con Bilanciere',
            link: '/esercizi/affondi-bilanciere',
            description: 'Esercizio funzionale che lavora su quadricipiti, glutei e stabilizza il core, migliorando coordinazione e equilibrio.',
            photo: '/images/affondi-bilanciere.jpg',
            commonErrors: [
              'Avanzare troppo con il ginocchio anteriore',
              'Perdere l\'equilibrio durante il movimento',
              'Non mantenere il busto eretto',
              'Movimento troppo veloce'
            ],
            solutions: [
              'Mantenere il ginocchio posteriore vicino al suolo senza toccarlo',
              'Usare un appoggio o iniziare senza peso per migliorare la stabilità',
              'Mantenere il busto verticale e lo sguardo avanti',
              'Eseguire il movimento con controllo e precisione'
            ],
          },
          {
            name: 'Stacchi da Terra',
            link: '/esercizi/stacchi-terra',
            description: 'Esercizio composto che lavora posteriore, glutei, schiena e gambe, fondamentale per la forza globale del corpo.',
            photo: '/images/stacchi-terra.jpg',
            commonErrors: [
              'Arrotondare la schiena',
              'Sollevare il bilanciere con la schiena invece che con le gambe',
              'Non mantenere la barra vicina al corpo',
              'Estendere troppo velocemente'
            ],
            solutions: [
              'Mantenere la schiena dritta e neutra durante tutto il movimento',
              'Iniziare la fase di sollevamento spingendo con le gambe',
              'Mantenere il bilanciere vicino al corpo durante tutto il movimento',
              'Controllare sia la fase di sollevamento che di discesa'
            ],
          },
          {
            name: 'Estensioni Quadricipiti',
            link: '/esercizi/estensioni-quadricipiti',
            description: 'Esercizio di isolamento per i quadricipiti, ottimo per definizione e rinforzo muscolare.',
            photo: '/images/estensioni-quadricipiti.jpg',
            commonErrors: [
              'Usare momentum invece della forza muscolare',
              'Estendere completamente le ginocchia',
              'Non controllare la fase negativa',
              'Sollevare i glutei dalla seduta'
            ],
            solutions: [
              'Movimento controllato senza utilizzare slancio',
              'Fermarsi prima dell\'estensione completa per mantenere tensione',
              'Scendere lentamente durante la fase eccentrica',
              'Mantenere la schiena aderente alla seduta'
            ],
          },
          {
            name: 'Curl Femorali',
            link: '/esercizi/curl-femorali',
            description: 'Esercizio di isolamento per i muscoli posteriori della coscia, importante per equilibrio muscolare e prevenzione degli infortuni.',
            photo: '/images/curl-femorali.jpg',
            commonErrors: [
              'Sollevare i fianchi dalla seduta',
              'Movimento troppo veloce',
              'Non completare il range di movimento',
              'Utilizzare un carico eccessivo'
            ],
            solutions: [
              'Mantenere i fianchi fermi e aderenti alla seduta',
              'Eseguire il movimento con controllo e lentezza',
              'Portare i piedi completamente verso i glutei',
              'Scegliere un carico che consenta un\'esecuzione corretta'
            ],
          },
          {
            name: 'Squat a Corpo Libero',
            link: '/esercizi/squat-corpo-libero',
            description: 'Variante dello squat senza carico, ottima per riscaldamento, tecnica e allenamento funzionale.',
            photo: '/images/squat-corpo-libero.jpg',
            commonErrors: [
              'Ginocchia che si avvicinano troppo',
              'Talloni che si sollevano',
              'Non raggiungere la profondità corretta',
              'Perdita di equilibrio'
            ],
            solutions: [
              'Spingere le ginocchia verso l\'esterno',
              'Mantenere i piedi completamente a terra',
              'Scendere fino a che i fianchi siano sotto il livello delle ginocchia',
              'Usare un supporto se necessario per migliorare l\'equilibrio'
            ],
          },
          {
            name: 'Step Up',
            link: '/esercizi/step-up',
            description: 'Esercizio funzionale che migliora forza, equilibrio e coordinazione, lavorando specificamente quadricipiti e glutei.',
            photo: '/images/step-up.jpg',
            commonErrors: [
              'Spinta insufficiente',
              'Non estendere completamente la gamba',
              'Utilizzare un gradino troppo alto',
              'Perdere l\'equilibrio'
            ],
            solutions: [
              'Spingere decisamente con la gamba sul gradino',
              'Portare completamente il corpo in estensione sul gradino',
              'Scegliere un\'altezza appropriata alle proprie capacità',
              'Usare un supporto o una ringhiera per stabilità iniziale'
            ],
          },
          {
            name: 'Walking Lunges',
            link: '/esercizi/walking-lunges',
            description: 'Variante dinamica degli affondi che migliora coordinazione, equilibrio e resistenza muscolare.',
            photo: '/images/walking-lunges.jpg',
            commonErrors: [
              'Passi troppo corti',
              'Perdita di equilibrio',
              'Ginocchio anteriore che va oltre la punta del piede',
              'Busto inclinato'
            ],
            solutions: [
              'Eseguire passi lunghi e ampi',
              'Mantenere un punto di riferimento statico durante il movimento',
              'Assicurarsi che il ginocchio anteriore non superi la punta del piede',
              'Mantenere il busto eretto e lo sguardo avanti'
            ],
          },
          {
            name: 'Bulgarian Split Squat',
            link: '/esercizi/bulgarian-split-squat',
            description: 'Esercizio unilaterale che migliora forza, equilibrio e correzione degli squilibri muscolari.',
            photo: '/images/bulgarian-split-squat.jpg',
            commonErrors: [
              'Instabilità durante il movimento',
              'Non raggiungere la profondità corretta',
              'Perdita di equilibrio',
              'Sovraccarico eccessivo'
            ],
            solutions: [
              'Iniziare senza carico per migliorare la tecnica',
              'Scendere fino a che il ginocchio posteriore sia vicino al suolo',
              'Usare un supporto per migliorare stabilità',
              'Scegliere un carico che consenta un controllo completo'
            ],
          }
        ],
      },
      {
        category: 'Spalle',
        icon: <Dumbbell className="text-yellow-500" />,
        exercises: [
          {
            name: 'Overhead Press con Bilanciere',
            link: '/esercizi/overhead-press',
            description: 'Esercizio base per lo sviluppo delle spalle, in particolare del deltoide anteriore e del trapezio.',
            photo: '/images/overhead-press.jpg',
            commonErrors: [
              'Inarcare eccessivamente la schiena',
              'Non mantenere i gomiti sotto il bilanciere',
              'Usare un peso troppo elevato senza controllo',
            ],
            solutions: [
              'Mantenere una leggera curva naturale nella schiena',
              'Allineare i gomiti sotto il bilanciere',
              'Scegliere un peso che permetta un movimento controllato',
            ],
          },
          {
            name: 'Arnold Press con Manubri',
            link: '/esercizi/arnold-press',
            description: 'Variante dinamica della pressa per spalle, che coinvolge tutti i capi del deltoide.',
            photo: '/images/arnold-press.jpg',
            commonErrors: [
              'Non controllare il movimento rotazionale',
              'Inclinare troppo il busto all’indietro',
            ],
            solutions: [
              'Eseguire una rotazione lenta e controllata',
              'Mantenere il busto dritto durante tutto il movimento',
            ],
          },
          {
            name: 'Alzate Laterali con Manubri',
            link: '/esercizi/alzate-laterali',
            description: 'Esercizio isolante per il deltoide laterale, fondamentale per ottenere spalle larghe.',
            photo: '/images/alzate-laterali.jpg',
            commonErrors: [
              'Usare lo slancio del corpo per sollevare i pesi',
              'Alzare i manubri oltre il livello delle spalle',
            ],
            solutions: [
              'Eseguire il movimento lentamente e senza slancio',
              'Sollevare i manubri solo fino al livello delle spalle',
            ],
          },
          {
            name: 'Alzate Frontali con Manubri o Bilanciere',
            link: '/esercizi/alzate-frontali',
            description: 'Esercizio isolante per il deltoide anteriore, utile per migliorare l’aspetto frontale delle spalle.',
            photo: '/images/alzate-frontali.jpg',
            commonErrors: [
              'Usare troppo peso e perdere il controllo',
              'Non mantenere le spalle basse durante il movimento',
            ],
            solutions: [
              'Scegliere un peso adeguato per un’esecuzione corretta',
              'Mantenere le spalle rilassate e basse durante il movimento',
            ],
          },
          {
            name: 'Face Pull ai Cavi',
            link: '/esercizi/face-pull',
            description: 'Esercizio che lavora sul deltoide posteriore e migliora la postura delle spalle.',
            photo: '/images/face-pull.jpg',
            commonErrors: [
              'Non tenere i gomiti alti durante il movimento',
              'Usare troppo peso',
            ],
            solutions: [
              'Mantenere i gomiti alti e in linea con le spalle',
              'Scegliere un carico che permetta un movimento fluido e controllato',
            ],
          },
          {
            name: 'Shrugs con Bilanciere o Manubri',
            link: '/esercizi/shrugs',
            description: 'Esercizio per sviluppare i trapezi e migliorare l’estetica delle spalle.',
            photo: '/images/shrugs.jpg',
            commonErrors: [
              'Ruotare le spalle durante il movimento',
              'Non mantenere il collo rilassato',
            ],
            solutions: [
              'Sollevare le spalle verso le orecchie senza ruotarle',
              'Rilassare il collo durante il movimento',
            ],
          },
          {
            name: 'Pike Push-Up',
            link: '/esercizi/pike-push-up',
            description: 'Versione avanzata del push-up che concentra il lavoro sui deltoidi anteriori e laterali.',
            photo: '/images/pike-push-up.jpg',
            commonErrors: [
              'Posizionare le mani troppo larghe o troppo strette',
              'Non mantenere un angolo adeguato tra busto e gambe',
            ],
            solutions: [
              'Allineare le mani con le spalle per una posizione stabile',
              'Creare un angolo di circa 90 gradi tra busto e gambe',
            ],
          },
          {
            name: 'Lento Avanti con Bilanciere da Seduto',
            link: '/esercizi/lento-avanti',
            description: 'Esercizio classico per costruire forza e massa nei deltoidi anteriori e laterali.',
            photo: '/images/lento-avanti.jpg',
            commonErrors: [
              'Non abbassare il bilanciere fino al livello del mento',
              'Spingere il peso in avanti invece che verso l’alto',
            ],
            solutions: [
              'Portare il bilanciere fino al livello del mento prima di risalire',
              'Spingere il bilanciere direttamente verso l’alto',
            ],
          },
          {
            name: 'Tirate al Mento con Bilanciere',
            link: '/esercizi/tirate-mento',
            description: 'Esercizio per il deltoide laterale e i trapezi, utile per aumentare la larghezza delle spalle.',
            photo: '/images/tirate-mento.jpg',
            commonErrors: [
              'Alzare troppo il bilanciere oltre il livello delle spalle',
              'Incurvare i polsi durante il movimento',
            ],
            solutions: [
              'Fermarsi quando il bilanciere raggiunge il livello delle spalle',
              'Mantenere i polsi dritti durante tutto il movimento',
            ],
          },
          {
            name: 'Reverse Fly su Panca Inclinata',
            link: '/esercizi/reverse-fly',
            description: 'Esercizio per il deltoide posteriore e i muscoli scapolari, ideale per migliorare la postura.',
            photo: '/images/reverse-fly.jpg',
            commonErrors: [
              'Usare troppo peso e perdere la tecnica corretta',
              'Non mantenere i gomiti leggermente flessi',
            ],
            solutions: [
              'Scegliere un peso che consenta un movimento controllato',
              'Mantenere i gomiti leggermente piegati durante tutto il movimento',
            ],
          },
        ],
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