/*------------------------------------------------------------------*
 * html-elements.ts													*
 *																	*
 * Historico:	07/12/2021	Primer version							*
 *																	*
 * Implementa la manipulacion/creacion de los elementos HTML utili- *
 * zados por la aplicacion.                                         *
 *------------------------------------------------------------------*/


 /*------------------------------------------------------------------*
  * buildSwitchInput(name, on, off, checked)					     *
  *																	 *
  * Entrada:     name        Identificador a asignar al boton        *
  * 		     on          Texto a asignar para indicar 'on'       *
  *              off         Texto a asignar para indicar 'off'      *
  *              checked     Especifica si debe estar o no con tilde *
  *																	 *
  * Salida:		No posee                                             *
  *																	 *
  * Retorno:	Un string con un elemento HTML                       *
  *																	 *
  * Descripcion:													 *
  *																	 *
  * Genera un string con un elemento HTML que representa un switch   *
  * de materialize. Esta envuelto en una row y un div.               *
  *------------------------------------------------------------------*/
 
function buildSwitchInput(name : string, on : string, off : string, checked ? : boolean)
{
    return `<div class="row">
                <div class="switch col s12" style="maring-bottom:5%;maring-top:5%">
                    <label>
                        ${off}
                        <input id=\"${name}\" type="checkbox" ${(checked ? 'checked' : '')}>
                        <span class="lever"></span>
                        ${on}
                    </label>
                </div>
            </div>`
}


 /*------------------------------------------------------------------*
  * buildRangeInput(name, min, max, minStr, maxStr)					 * 
 *																	 *
  * Entrada:     name        Identificador a asignar al boton        *
  * 		     min         Valor minimo                            *
  *              max         Valor maximo                            *
  *              minStr      String a mostrar para el minimo         *
  *              maxStr      String a mostrar para el maximo         *
  *																	 *
  * Salida:		No posee                                             *
  *																	 *
  * Retorno:	Un string con un elemento HTML                       *
  *																	 *
  * Descripcion:													 *
  *																	 *
  * Genera un string con un elemento HTML que representa un range    *
  * de materialize. Esta envuelto en una row y un div.               *
  *------------------------------------------------------------------*/

function buildRangeInput(name: string, min : number, max : number, minStr: string, maxStr : string)
{
    // Los elementos de inicio y fin siempre seran de 1 columna.
    // El elemento del medio varia su tamaño en funcion al tamaño de la pantalla
    // -----------------------------------------------
    // |     |                                 |     |
    // | min | _______________________________ | max |
    // |     |                                 |     |
    // -----------------------------------------------
    return `
    <div class="row">
        <div class="col s2 m1 l1 xl1">
            <p>${minStr}(${min})</p>
        </div>
        <div class="col s5 m4 l3 xl3 push-s1">
            <p class="range-field">
                <input type="range" id=\"${name}\" min=${min} max=${max} />
            </p>
        </div>
        <div class="col s2 m1 l1 xl1 push-s1">
            <p>${maxStr}(${max})</p>
        </div>
    </div>`
}

 /*------------------------------------------------------------------*
  * buildItemFromDevice(i)					                         * 
 *																	 *
  * Entrada:     i          Indice dentro del arreglo global de dis- *
  *                         positivos.                               *
  *																	 *
  * Salida:		No posee                                             *
  *																	 *
  * Retorno:	Un string con un elemento HTML                       *
  *																	 *
  * Descripcion:													 *
  *																	 *
  * Genera un string con un elemento HTML que representa un dispo-   *
  * sitivo. Esta envuelto en una row y un div.                       *
  *------------------------------------------------------------------*/

function buildItemFromDevice(i : number)
{   
    let typeStr : string = '';
    let d : Device       = devArrayGlobal[i];

    const FUNC_DELETE_DEVICE = `userClickDelete(${d.id})`; // aqui directamente se usa el identificador del dispositivo
    const FUNC_UPDATE_DEVICE = `userClickEdit(${i})`; // aqui se usa el indice dentro del arreglo de dispositivos globales
    
    for(let i = 0 ; i < DEVICES_ICONS.length; i++) {
        if(d.type === DEVICES_ICONS[i].type)
            typeStr = DEVICES_ICONS[i].text;
    }
    return `\
            <div class="row">
                <div class="col s12 m12 l6 xl6">
                    <i class="material-icons circle grey">${getIcon(d.type)}</i>
                    <span class="title"><b>${d.name}</b></span>
                    <p><b>Descripcion:</b> ${d.description}</p>
                    <p><b>Tipo:</b> ${typeStr}</p>
                    <p><b>Valor:</b> ${d.state}</p>
                </div>
                <div class="col s12 m6 l2 xl2" align="right" style="margin-bottom : 5%">
                    <button class="btn waves-effect waves-light button-view" onclick="${FUNC_DELETE_DEVICE}">Eliminar</button>
                </div>
                <div class="col s12 m6 l2 xl2" align="right" style="margin-bottom : 5%">
                    <button class="btn waves-effect waves-light button-view" onclick="${FUNC_UPDATE_DEVICE}">Editar</button>
                </div>
            </div>`;
}

 /*------------------------------------------------------------------*
  * buildButton(name, eventName, eventFunc)	                         * 
 *																	 *
  * Entrada:    name        Identificador del elemento HTML          *
  *             eventName   Nombre del evento a registrar            *
  *             eventFunc   Funcion a registrar p/el evento          *
  *																	 *
  * Salida:		No posee                                             *
  *																	 *
  * Retorno:	Un string con un elemento HTML                       *
  *																	 *
  * Descripcion:													 *
  *																	 *
  * Genera un string con un elemento HTML que representa un boton    *
  *------------------------------------------------------------------*/

function buildButton(name : string, eventName : string, eventFunc : string)
{
    return `<button class="btn waves-effect waves-light button-view" id ="${name}" ${eventName}=\"${eventFunc}\">${name}</button>`;
}

 /*------------------------------------------------------------------*
  * buildDiv(innerHtml, colSmall, colMedium, colLarge, colXlarge)    * 
  *																	 *
  * Entrada:    innerHtml   Cotenido para el elemento                *
  *             colSmall    Numero de columnas para small            * 
  *             colMedium   Numero de columnas para medium           *
  *             colLarge    Numero de columnas para large            *
  *             colXlarge   Numero de columnas para xlarge           *
  *                                                                  *
  * Salida:		No posee                                             *
  *																	 *
  * Retorno:	Un string con un elemento HTML                       *
  *																	 *
  * Descripcion:													 *
  *																	 *
  * Genera un div cuyo contenido es el especificado                  *
  *------------------------------------------------------------------*/

function buildDiv(innerHtml : string, colSmall : number, colMedium : number, colLarge : number, colXlarge : number)
{
    let d : string;
    let f = buildDiv.name;
    d =  `<div class="col s${colSmall} m${colMedium} l${colLarge} xl${colXlarge} style="margin-bottom : 5%">`
    d += `${innerHtml}`;
    d += `</div>`;
    return d;
}

 /*------------------------------------------------------------------*
  * buildRow(divs)                                                   * 
  *																	 *
  * Entrada:    divs        Arreglo de strings que representan divs  *
  *                                                                  *
  * Salida:		No posee                                             *
  *																	 *
  * Retorno:	Un string con un elemento HTML                       *
  *																	 *
  * Descripcion:													 *
  *																	 *
  * Genera una row cuyo contenido es el especificado                 *
  *------------------------------------------------------------------*/

function buildRow(divs : string[])
{
    let v : string = '';
    v = '<div class="row">'
    divs.forEach(div => v += div);
    v += '</div>'
    return v;
}

 /*------------------------------------------------------------------*
  * buildSelectType(name, eventName, eventFunc, value)               * 
  *																	 *
  * Entrada:    name        Identificador del elemento HTML          *
  *             eventName   Nombre del evento a registrar            *
  *             eventFunc   Funcion a registrar p/el evento          *
  *             value       Valor inicial (opcional)                 *
  *                                                                  *
  * Salida:		No posee                                             *
  *																	 *
  * Retorno:	Un string con un elemento HTML                       *
  *																	 *
  * Descripcion:													 *
  *																	 *
  * Genera un selector con opciones de tipo de dispositivo           *
  *------------------------------------------------------------------*/

function buildSelectType(name : string, eventName : string, eventFunc : ONCHANGE_CALLBACK, value ? : number) 
{
    let defaultValue : number;
    let defaultText : string;
    let v = '';

    if(value === undefined) {
        defaultText  =  'Seleccionar tipo';
        defaultValue = -1;
    } 
    else {
        for(let i = 0; i < DEVICES_ICONS.length; i++ ) {
            if(DEVICES_ICONS[i].type === value) {
                defaultValue = DEVICES_ICONS[i].type;
                defaultText = DEVICES_ICONS[i].text;
            }
        }
    }

    v += `<div class="input-field col s12 m12 l12 lx12"><select ${eventName}="${eventFunc.name}(this)"><option value=${defaultValue} disabled selected>${defaultText}</option>`;
    
    DEVICES_ICONS.forEach( value => v += `<option value="${value.type}">${value.text}</option>`)

    v += `</select><label>Tipo de dispositivo</label><label id=${name} hidden></label></div>`;

    return v;
}

 /*------------------------------------------------------------------*
  * buildTitle(title)                                                * 
  *																	 *
  * Entrada:    title       Cotenido del titulo                      *
  *                                                                  *
  * Salida:		No posee                                             *
  *																	 *
  * Retorno:	Un string con un elemento HTML                       *
  *																	 *
  * Descripcion:													 *
  *																	 *
  * Genera un div que adentro incluye el titulo                      *
  *------------------------------------------------------------------*/

function buildTitle(title : string)
{
    return `<div class="col s12" style="text-align:center">
                <br><h3>${title}</h3><br>
            </div>`    
}

 /*------------------------------------------------------------------*
  * buildTextBox(id, name, value)                                    * 
  *																	 *
  * Entrada:    id          Identificador del elemento HTML          *
  *             name        Nombre de la etiqueta                    *
  *             value       Valor por defecto (opcional)             *
  *                                                                  *
  * Salida:		No posee                                             *
  *																	 *
  * Retorno:	Un string con un elemento HTML                       *
  *																	 *
  * Descripcion:													 *
  *																	 *
  * Genera textbox dentro de una row y un div.                       *
  *------------------------------------------------------------------*/

function buildTextBox(id : string, name : string, value? : string)
{
    return `<div class="row">
                <div class="input-field col s12 m12 l12 lx12"">
                    <input id="${id}" type="text" ${(value !== undefined) ? `value=\"${value}\"` : '""' }  class="validate">
                    <label class="active" id="${id}Label" for="first_name2">${name}</label>
                </div>
            </div>`;
}
