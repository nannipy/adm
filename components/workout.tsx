export interface Workout {
    esercizio: string;
    serie: number | string;
    rep: number | string;
    rest: string;
    note: string[];
  }
  
  export const workoutSections = {
    push: [
      {
        esercizio: "Lento avanti con manubri",
        serie: 3,
        rep: 8,
        rest: "2'-3'",
        note: [
          "mantieni gli avambracci perpendicolari",
          "Lavora con il braccio a 45° col busto"
        ]
      },
      {
        esercizio: "Alzate laterali",
        serie: 3,
        rep: 12,
        rest: "1'-1'30''",
        note: [
          "lavora con il braccio leggermente più avanti rispetto al busto"
        ]
      },
      {
        esercizio: "Spinte con manubri su panca a 30°",
        serie: 3,
        rep: 8,
        rest: "2'-3'",
        note: [
          "mantieni avambracci perpendicolari",
          "Gomiti a 45° col busto"
        ]
      },
      {
        esercizio: "Chest press",
        serie: 3,
        rep: "8/10",
        rest: "2'-3'",
        note: [
          "mantieni avambracci perpendicolari",
          "Posiziona l'impugnatura ad altezza capezzolo circa",
          "Braccio a 45° col busto"
        ]
      },
      {
        esercizio: "Croci ai cavi",
        serie: 2,
        rep: 12,
        rest: "1'-1'30''",
        note: [
          "puoi farle anche con i manubri"
        ]
      },
      {
        esercizio: "French press con manubri",
        serie: 3,
        rep: "8/10",
        rest: "1'-2'",
        note: [
          "mantieni i gomiti fermi"
        ]
      },
      {
        esercizio: "Push down al cavo alto con corda",
        serie: 3,
        rep: "10/12",
        rest: "1'-1'30''",
        note: [
          "mantieni i gomiti fermi"
        ]
      },
      {
        esercizio: "Sit up con peso",
        serie: 3,
        rep: 12,
        rest: "1'",
        note: []
      }
    ],
    pull: [
      {
        esercizio: "Lat machine",
        serie: 3,
        rep: "8/10",
        rest: "2'-3'",
        note: [
          "Mantieni una presa media poco più larga delle spalle",
          "mantieni sempre gli avambracci perpendicolari"
        ]
      },
      {
        esercizio: "Pulley",
        serie: 3,
        rep: "8/10",
        rest: "2'-3'",
        note: [
          "da eseguire con il triangolo",
          "Porta il triangolo ad altezza ombelico",
          "Non andare indietro con il busto nell'esecuzione"
        ]
      },
      {
        esercizio: "Pull down",
        serie: 3,
        rep: "10/12",
        rest: "1'-2'",
        note: [
          "mantieni l'apertura dei gomiti invariata per tutto l'allenamento",
          "Concentrati sull'avvicinare il braccio al busto",
          "Da eseguire con una corda (la più lunga che hai in palestra)"
        ]
      },
      {
        esercizio: "Panca scott con bilanciere",
        serie: 3,
        rep: "8/10",
        rest: "1'-1'30''",
        note: []
      },
      {
        esercizio: "Hammer curl su panca a 60°",
        serie: 3,
        rep: 10,
        rest: "1'-1'30''",
        note: []
      }
    ],
    upper: [
      {
        esercizio: "Spinte con manubri con panca a 15°",
        serie: 3,
        rep: 8,
        rest: "2'-3'",
        note: [
          "mantieni gli avambracci perpendicolari sempre",
          "Gomiti 45° col busto"
        ]
      },
      {
        esercizio: "Panca a 45° al multipower",
        serie: 3,
        rep: "8/10",
        rest: "2'-3'",
        note: [
          "mantieni gli avambracci perpendicolari sempre perpendicolari",
          "Gomiti a 45° col busto"
        ]
      },
      {
        esercizio: "Shoulder press",
        serie: 3,
        rep: "8/10",
        rest: "2'-3'",
        note: [
          "mantieni gli avambracci perpendicolari",
          "Lavora con il braccio a 45° col busto"
        ]
      },
      {
        esercizio: "Alzate laterali singole al cavo",
        serie: 3,
        rep: 12,
        rest: "1'",
        note: [
          "braccio leggermente avanti rispetto al busto",
          "Posiziona il cavo ad altezza del bacino"
        ]
      },
      {
        esercizio: "Rematore con manubri su panca a 30°",
        serie: 3,
        rep: 8,
        rest: "2'-3'",
        note: [
          "posizionati a pancia in giù sullo schienale a 30° con la testa che sporge",
          "Porta i gomiti verso l'alto e verso dietro con un angolo di 90° in contrazione"
        ]
      },
      {
        esercizio: "Alzate posteriori con panca a 30°",
        serie: 3,
        rep: 15,
        rest: "1'-1'30''",
        note: [
          "posizionati a pancia in giù sulla panca con la testa che sporge",
          "Cerca di non avvicinare le scapole nell'esecuzione"
        ]
      },
      {
        esercizio: "Leg raise appeso alla sbarra",
        serie: 3,
        rep: "Cedimento",
        rest: "1'",
        note: []
      }
    ]
  };
  
  export const tabs = [
    { id: "push", label: "PUSH" },
    { id: "pull", label: "PULL" },
    { id: "upper", label: "UPPER" },
  ];