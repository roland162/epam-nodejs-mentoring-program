process.stdin.setEncoding("utf8");
process.stdin.on("data", (input) => {
	const inputString = input.toString();
  if (inputString.trim().length) {
    const reversedData = inputString.split("").reverse().join("");
    process.stdout.write(`Input reversed: ${reversedData} \n\n`);
  }
});
