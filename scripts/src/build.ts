import readConfig from "./readConfig";
import builder from "./builder";

readConfig().then(builder).catch(console.error);
