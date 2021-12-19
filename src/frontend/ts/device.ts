
/*------------------------------------------------------------------*
 * device.js														*
 *																	*
 * Historico:	07/12/2021	Primer version							*
 *																	*
 * Implementa la clase Device que representa un dispositivo         *
 *------------------------------------------------------------------*/

const DEVICE_ID_INVALID = -1; // Valor asignado al identificador cuando el elemento no existe aun en la dB



class Device 
{
    id          : number; // Identificador asignado por la dB
    name        : string; // Nombre del dispositivo 
    description : string; // Descripcion de dispositivo 
    state       : number; // estado o valor del interruptor asociado al dispositivo
    type        : number; // Numero que identifica el tipo de dispositivo

    private constructor(id  : number, name : string, description : string, state : number, type : number) 
    {
        this.id          = id;
        this.name        = name;
        this.description = description;
        this.state       = state;
        this.type        = type;
    }

    // Crea un nuevo dispositivo con un id invalido 
    static buildNew(name : string, description : string, state : number, type : number) 
    {
        return new Device(DEVICE_ID_INVALID, name, description, state, type); 
    }
    // Crea un dispositivo desde un objeto pre-existente 
    static buildFromObj(obj : any)
    {
        if(Device.checkObj(obj) === false)
            return null;
        return new Device(obj.id, obj.name, obj.description, obj.state, obj.type)
    }
    // Convierte el dispositivo en un string formateado en json
    toJson()
    {
        return JSON.stringify(this);
    }
    // Verifica que el objeto recibido posea la estructura necesaria para representar un dispositivo
    private static checkObj(obj : any) 
    {
        const f = Device.checkObj.name;
        if(obj === undefined || obj === null) {
            logger(f, 'Invalid obj reference');
            return false;
        }
        if(obj.id === undefined || typeof obj.id !== 'number' || Number.isInteger(obj.id) === false) {
            logger(f, `Invalid obj : 'id' attribute must exist and be an integer`);
            return false;
        }
        if(obj.name === undefined || typeof obj.name !== 'string') {
            logger(f, `Invalid obj : 'name' attribute must exist and be an string`);
            return false;
        }        
        if(obj.description === undefined || typeof obj.description !== 'string') {
            logger(f, `Invalid obj : 'description' attribute must exist and be an string`);
            return false;
        }  
        if(obj.state === undefined || typeof obj.state !== 'number' || Number.isInteger(obj.state) === false) {
            logger(f, `Invalid obj : 'state' attribute must exist and be an integer`);
            return false;
        }      
        if(obj.type === undefined || typeof obj.type !== 'number' || Number.isInteger(obj.type) === false) {
            logger(f, `Invalid obj : 'type' attribute must exist and be an integer`);
            return false;
        }    
        return true;
    }

}