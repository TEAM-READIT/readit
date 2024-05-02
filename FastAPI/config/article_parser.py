class ArticleParser:
    @staticmethod
    def clear_headline(headline):
        return headline.replace('\"', '')

    @staticmethod
    def clear_content(content):
        return content.replace('\"', '')
