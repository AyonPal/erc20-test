const uuid = require('uuid')
var express = require('express');
var router = express.Router();
const fs = require("fs")
const path = require("path");
const { execSync } = require('child_process');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/createToken', async (req, res, next) => {
  const {supply , name, symbol } = req.body;
  if (!supply ) {
    return res.json({success: "false", error: "supply must be present"})
  }
  if (!name ) {
    return res.json({success: "false", error: "name must be present"})
  }
  if (!symbol ) {
    return res.json({success: "false", error: "symbol must be present"})
  }
  if (!/^\d+$/.test(supply) ) {
    return res.json({success: "false", error: "supply must be numeric"})
  }
  if (!symbol.toUpperCase() === symbol) {
    return res.json({success: "false", error: "symbol must be uppercase"})
  }
  try {
  // build artifacts
  let sol_template = fs.readFileSync(path.join(appRoot, "contracts/Token.sol.tpl"))
  let uid = uuid.v4()
  let outFileName = "T"+ uid.replace(/-/g, "")
  let sol_output = sol_template.toString().replace("{{name}}", name).replace("{{symbol}}", symbol).replace("{{className}}", outFileName)
  fs.writeFileSync(path.join(appRoot, "contracts", outFileName+".sol"), sol_output)
  execSync('npm run build')
  // deploy the build
  let script_template = fs.readFileSync(path.join(appRoot, "scripts/deploy.js.tpl"))
  let script_output = script_template.toString().replace("{{uid}}", outFileName).replace("{{supply}}", supply)
  let script_path  =  path.join(appRoot, "scripts", outFileName+".js")
  fs.writeFileSync(script_path, script_output)
  let build_command = "npx hardhat run " + script_path + " --network mumbai"
  const address = execSync(build_command)
  return res.json({success: "true", contract_address: address.toString().replace(/(\r\n|\n|\r)/gm, "")}) // remove newlines from string
  }
  catch (err) {
    console.log(err)
    return res.json({success: "false", error : "check server logs for error details"})
  }
})
module.exports = router;
