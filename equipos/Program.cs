using System;
using System.Collections.Generic;

public class Arquero 
{
    // Propiedades sin inicialización
    public string Nombre { get; set; } 
    public int Atajada { get; set; } 

    // Constructor: Este método se llama al crear un nuevo Arquero
    public Arquero(string nombreArq, int atajadaPunt) 
    {
        Nombre = nombreArq;
        Atajada = atajadaPunt;
    }
}

public class Jugador
{
    // --- PROPIEDADES ALMACENADAS ---
    public string Nombre { get; set; }
    public int Defensa { get; set; }
    public int Pase { get; set; }
    public int Regate { get; set; }
    public int Tiro { get; set; }
    public int Velocidad { get; set; } // Componente del Ritmo
    public int Resistencia { get; set; } // Componente del Ritmo

    // --- PROPIEDAD CALCULADA (Ritmo) ---
    // Retorna el promedio de Velocidad y Resistencia. Es de solo lectura.
    public double Ritmo 
    {
        get 
        {
            // Usamos 2.0 para forzar la división a que sea un número decimal (double)
            return (Velocidad + Resistencia) / 2.0; 
        }
    }

    // --- CONSTRUCTOR ---
    // Asigna todos los valores al momento de crear la instancia del jugador.
    public Jugador(string nombre, int defensa, int pase, int regate, int tiro, int velocidad, int resistencia)
    {
        Nombre = nombre;
        Defensa = defensa;
        Pase = pase;
        Regate = regate;
        Tiro = tiro;
        
        // Asignación de los componentes del Ritmo
        Velocidad = velocidad;
        Resistencia = resistencia;
    }
}




class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("Proyecto C# iniciado.");
        
        // Aquí probaremos tus clases
    }
}