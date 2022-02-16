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
        this.encodeMap = {" " : " ", "," : ",", "." : "."};
        this.decodeMap = {" " : " ", "," : ",", "." : "."};

        for(let i = 0; i < 26; i++)
            {
                let actualletter = i;
                actualletter += 97;
                actualletter = String.fromCharCode(actualletter)

                this.encodeMap[actualletter] = this.cipher[i];
                this.decodeMap[this.cipher[i]] = actualletter;
            }
    }
  
    encode(str) 
    {
        let encodedstr = str.split('').map((ch) => 
                {
                    return this.encodeMap[ch];
                })

                return encodedstr.join('');
    }
  
    decode(str) 
    {
        let decodedstr = str.split('').map((ch) => 
                {
                    return this.decodeMap[ch];
                })

                return decodedstr.join('');
    }

}

class decoderRing extends decoder {
    constructor(rotation) {
      // DO THIS PART - build a string str
      let str = [];
      for(let i = 0; i < 26; i++)
        {
            
            let cipherletter = (i + rotation) % 26;
            cipherletter += 97;
            str.push(String.fromCharCode(cipherletter));
        }

      // consisting of the rotated alphabet
      // then invoke the superclass constructor
      // e.g., if rotation === 2,
      //   str === 'cdefghj...';
      super(str.join(""));
    }
  }

let caesar = new decoderRing(1);
let secret = new decoder("cdefghijklmnopqrstuvwxyzab");
console.assert(caesar.encode("yz") === "za");
console.assert(secret.encode("yz") === "ab");
console.assert(caesar.decode("za") === "yz");
console.assert(secret.decode("ab") === "yz");

export {decoder};
  