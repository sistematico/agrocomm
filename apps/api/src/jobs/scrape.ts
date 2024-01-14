const file = Bun.file("log.txt");
const writer = file.writer();
writer.write(new Date() + " run");
writer.flush();