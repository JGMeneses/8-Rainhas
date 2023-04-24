// conta a quantidade de soluções
let sol = 0;

// função para mostrar o tabuleiro
function mostrarTabuleiro(tab, N) {
  for (let i = 0; i < N; i++) {
    let row = "";
    for (let j = 0; j < N; j++) {
      if (tab[i][j] == 1)
        row += "R ";
      else
        row += "- ";
    }
    console.log(row);
  }
  console.log("\n");
}

// verifica se é seguro colocar a rainha numa determinada coluna
function seguro(tab, N, row, col) {
  let i, j;

  // verifica se ocorre ataque na linha
  for (i = 0; i < N; i++) {
    if (tab[row][i] == 1)
      return false;
  }

  // verifica se ocorre ataque na coluna
  for (i = 0; i < N; i++) {
    if (tab[i][col] == 1)
      return false;
  }

  // verifica se ocorre ataque na diagonal principal
  // acima e abaixo
  for (i = row, j = col; i >= 0 && j >= 0; i--, j--) {
    if (tab[i][j] == 1)
      return false;
  }
  for (i = row, j = col; i < N && j < N; i++, j++) {
    if (tab[i][j] == 1)
      return false;
  }

  // verifica se ocorre ataque na diagonal secundária
  // acima e abaixo
  for (i = row, j = col; i >= 0 && j < N; i--, j++) {
    if (tab[i][j] == 1)
      return false;
  }
  for (i = row, j = col; i < N && j >= 0; i++, j--) {
    if (tab[i][j] == 1)
      return false;
  }

  // se chegou aqui, então está seguro (retorna true)
  return true;
}

/*
  função que resolve o problema
  retorna true se conseguiu resolver e false caso contrário
*/
function executar(tab, N, col) {
  if (col == N) {
    console.log("Solucao " + (sol + 1) + ":\n\n");
    mostrarTabuleiro(tab, N);
    sol++;
    return;
  }

  for (let i = 0; i < N; i++) {
    // verifica se é seguro colocar a rainha naquela coluna
    if (seguro(tab, N, i, col)) {
      // insere a rainha (marca com 1)
      tab[i][col] = 1;

      // chamada recursiva
      executar(tab, N, col + 1);

      // remove a rainha (backtracking)
      tab[i][col] = 0;
    }

  }
}

let N = 8;
let tabuleiro = [];

// inicializa o tabuleiro com zeros
for (let i = 0; i < N; i++) {
  let linha = [];
  for (let j = 0; j < N; j++) {
    linha.push(0);
  }
  tabuleiro.push(linha);
}

executar(tabuleiro, N, 0);