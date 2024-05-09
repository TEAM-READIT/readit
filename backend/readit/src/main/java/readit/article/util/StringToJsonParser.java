package readit.article.util;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.FileReader;
import java.io.Reader;

public class StringToJsonParser {
    public static JSONObject convert(String input) throws ParseException {
        JSONParser parser = new JSONParser();
        return (JSONObject) parser.parse(input);
    }
}
