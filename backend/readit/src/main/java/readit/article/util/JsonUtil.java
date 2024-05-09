package readit.article.util;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import readit.article.domain.Article;
import readit.article.exception.JsonConvertException;
import readit.viewer.domain.dto.Word;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toList;

public class JsonUtil {
    public static JSONObject toJson(String input) {
        try{
            JSONParser parser = new JSONParser();
            return (JSONObject) parser.parse(input);
        } catch (ParseException e){
            throw new JsonConvertException();
        }
    }

    public static <T> List<T> toList(JSONObject jsonObject, Function<JSONObject, T> mapper){
        JSONArray jsonArray = (JSONArray) jsonObject.get("wordList");
        return (List<T>) jsonArray.stream()
                .map(obj -> {
                    JSONObject wordObj = (JSONObject) obj;
                    return mapper.apply(wordObj);
                })
                .collect(Collectors.toList());
    }
}