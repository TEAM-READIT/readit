package readit.article.util;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import readit.article.dto.response.GetWordResponse;
import readit.article.exception.JsonConvertException;

import java.util.List;
import java.util.stream.Collectors;

public class ArticleJsonUtil {
    public static JSONObject toJson(String input) {
        try{
            JSONParser parser = new JSONParser();
            return (JSONObject) parser.parse(input);
        } catch (ParseException e){
            throw new JsonConvertException();
        }
    }

    public static List<GetWordResponse> toList(JSONObject jsonObject) {
        JSONArray jsonArray = (JSONArray) jsonObject.get("wordList");
        return (List<GetWordResponse>) jsonArray.stream()
                .map(obj -> {
                    JSONObject wordObj = (JSONObject) obj;
                    String word = (String) wordObj.get("word");
                    String definition = (String) wordObj.get("definition");
                    return new GetWordResponse(word, definition);
                })
                .collect(Collectors.toList());
    }
}