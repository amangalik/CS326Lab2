const printMe = (i, j) => {
    console.log("You clicked on (" + (i + 1) + ", " + (j + 1) + ")");
  };
  
  const build = () => {
    const numCols = 8,
      numRows = 8,
      pieces = [
        "rook",
        "knight",
        "bishop",
        "queen",
        "king",
        "bishop",
        "knight",
        "rook",
      ],
      theGrid = document.getElementById("theGrid");
  
      // CREATE THE CHESS BOARD HERE!
      for(let i = 0; i < numCols; i++)
      {
          for(let j = 0; j < numRows; j++)
          {
              const square = document.createElement("div");
              if((i % 2 === 0 && j % 2 === 0) || (i % 2 === 1 && j % 2 === 1))
              {
                square.classList.add("white-grid-item");
              }
              else
              {
                square.classList.add("black-grid-item");
              }
              
              if(i === 1 || i === 6)
              {
                const pawnNode = document.createTextNode("pawn");
                square.append(pawnNode);
              }
              else if(i === 0 || i === 7)
              {
                  const pieceNode = document.createTextNode(pieces[j]);
                  square.append(pieceNode);
              }
              square.addEventListener("click", () => {printMe(j, i);});
              square.classList.add("grid-item");
              theGrid.appendChild(square);
          }
      }
  };
  
  build();