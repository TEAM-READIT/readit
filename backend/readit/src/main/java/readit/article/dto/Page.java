package readit.article.dto;

import java.util.Iterator;
import java.util.List;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

public class Page<T> implements Iterable<T> {
    private final List<T> internalList;
    public Boolean hasNext;

    public Page(List<T> list,Integer limit){
        internalList = list;
        hasNext = checkHasNext(list,limit);
    }

    public Boolean checkHasNext(List<T> list,Integer limit){
        if(list.size() > limit){
            internalList.remove(internalList.size()-1);
            return true;
        }
        return false;
    }

    @Override
    public Iterator<T> iterator() {
        return internalList.iterator();
    }

    public Stream<T> stream() {
        return StreamSupport.stream(internalList.spliterator(), false);
    }
}
