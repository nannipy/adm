interface Macros {
    proteine: number;
    carboidrati: number;
    grassi: number;
  }
  
  interface Pasto {
    nome: string;
    calorie: number;
    ricetta: string;
    macros: Macros;
    alternative: string[];
  }
  
  interface DietaGiornaliera {
    colazione: Pasto;
    pranzo: Pasto;
    cena: Pasto;
  }
  
  export const getDietaGiornaliera = (): DietaGiornaliera => {
    return {
      colazione: {
        nome: "Porridge con frutta",
        calorie: 360,
        ricetta: "Cuoci 50g di fiocchi d'avena in 250ml di latte, aggiungi una banana a fette e una manciata di mirtilli.",
        macros: { proteine: 15, carboidrati: 55, grassi: 10 },
        alternative: ["Yogurt greco con granola e frutta", "Frittata di albumi con spinaci e toast integrale"]
      },
      pranzo: {
        nome: "Insalata di pollo",
        calorie: 450,
        ricetta: "Mescola 150g di petto di pollo grigliato a cubetti con insalata mista, pomodorini, cetrioli e condisci con olio d'oliva e aceto balsamico.",
        macros: { proteine: 40, carboidrati: 15, grassi: 25 },
        alternative: ["Bowl di quinoa con verdure e tofu", "Wrap integrale con tacchino e avocado"]
      },
      cena: {
        nome: "Salmone con verdure",
        calorie: 400,
        ricetta: "Cuoci 150g di salmone al forno con broccoli e carote al vapore. Condisci con succo di limone e erbe aromatiche.",
        macros: { proteine: 35, carboidrati: 20, grassi: 22 },
        alternative: ["Zuppa di lenticchie con pane integrale", "Frittata di uove intere con asparagi e patate dolci"]
      }
    };
  };
  
