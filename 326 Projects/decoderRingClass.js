"use strict"

class decoder
{
    constructor(cipher)
    {
        this._cipher = cipher;
        this._rebuildMaps();
    }

    get cipher()
    {
        return this._cipher;
    }

    set cipher(newCipher)
    {
        this._cipher = newCipher;
        this._rebuildMaps();
    }

    _rebuildMaps() // rebuilds encodeMap and decodeMap
    { 
        this.encodeMap = {};
        this.decodeMap = {};

        for(let i = 0; i < 26; i++)
            {
                actualletter = i;
                
                actualletter += 97;

                obj.encodemap[String.fromCharCode(actualletter)] = this._cipher.charAt(i);
                obj.decodemap[this._cipher.charAt(i)] = String.fromCharCode(actualletter);
            }
    }
  
    encode(str) 
    {
        let encodedstr = str.split('').map((ch) => 
                {
                    return this.encodemap[ch];
                })

                return encodedstr.join('');
    }
  
    decode(str) 
    {
        let decodedstr = str.split('').map((ch) => 
                {
                    return this.decodemap[ch]
                })

                return decodedstr.join('')
    }

    
}

class decoderRing extends decoder {
    constructor(rotation) {
      // DO THIS PART - build a string str
      let str = [];
      for(let i = 0; i < 26; i++)
        {
            
            cipherletter = (i + rotation) % 26;
            cipherletter += 97;
            str.push(String.fromCharCode(cipherletter));
        }
        
      // consisting of the rotated alphabet
      // then invoke the superclass constructor
      // e.g., if rotation === 2,
      //   str === 'cdefghj...';
      super(JSON.stringify(str));
    }
  }
  
  