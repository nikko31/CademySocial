from django import forms
from CademySocial.articles.models import Article


class ArticleForm(forms.ModelForm):
    status = forms.CharField(widget=forms.HiddenInput())
    title = forms.CharField(
        widget=forms.TextInput(attrs={'class': 'form-control'}),
        max_length=255)
    content = forms.CharField(
        widget=forms.Textarea(attrs={'class': 'form-control'}))
    tags = forms.CharField(
        widget=forms.TextInput(attrs={'class': 'form-control'}),
        max_length=255, required=False,
        help_text='Use spaces to separate the tags, such as "Python jsf SpectralClustering"')
    videos = forms.URLField(help_text='Add videos')

    class Meta:
        model = Article
        fields = ['title', 'content', 'videos', 'tags', 'status']
