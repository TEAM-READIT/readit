import os

class OverFlow(Exception):
    def __init__(self, args):
        self.message = f'{args} is overflow'

    def __str__(self):
        return self.message
    

class UnderFlow(Exception):
    def __init__(self, args):
        self.message = f'{args} is underflow'

    def __str__(self):
        return self.message


class InvalidArgs(Exception):
    def __init__(self, args):
        self.message = f'{args} is Invalid Arguments'

    def __str__(self):
        return self.message


class InvalidCategory(Exception):
    def __init__(self, category):
        self.message = f'{category} is Invalid Category.'

    def __str__(self):
        return self.message


class InvalidYear(Exception):
    def __init__(self, start_year, end_year):
        self.message = f'{start_year}(start year) is bigger than {end_year}(end year)'

    def __str__(self):
        return str(self.message)


class InvalidMonth(Exception):
    def __init__(self, month):
        self.message = f'{month} is an invalid month'

    def __str__(self):
        return self.message

class InvalidDay(Exception):
    def __init__(self, day):
        self.message = f'{day} is an invalid day'

    def __str__(self):
        return self.message



class OverbalanceMonth(Exception):
    def __init__(self, start_month, end_month):
        self.message = f'{start_month}(start month) is an overbalance with {end_month}(end month)'

    def __str__(self):
        return self.message

class OverbalanceDay(Exception):
    def __init__(self, start_day, end_day):
        self.message = f'{start_day}(start day) is an overbalance with {end_day}(end day)'

    def __str__(self):
        return self.message


class ResponseTimeout(Exception):
    def __init__(self):
        self.message = "Couldn't get the data"

    def __str__(self):
        return self.message


class ExistFile(Exception):
    def __init__(self, path):
        absolute_path = os.path.abspath(path)
        self.message = f'{absolute_path} already exist'

    def __str__(self):
        return self.message
