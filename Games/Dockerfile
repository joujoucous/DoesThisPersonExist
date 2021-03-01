FROM python:3
WORKDIR /project
ADD . /project
RUN pip install -r requirements.txt
ENTRYPOINT ["python"]
CMD ["python","-m","flask","run"]
CMD ["python","Parties.py"]
